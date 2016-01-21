var map,marker,opts,target,spinner,dr_data;

 //$(document).ready(function () {
     show('loading', false);
     opts = {
         lines: 13 // The number of lines to draw
         , length: 28 // The length of each line
         , width: 14 // The line thickness
         , radius: 42 // The radius of the inner circle
         , scale: 1 // Scales overall size of the spinner
         , corners: 1 // Corner roundness (0..1)
         , color: '#000' // #rgb or #rrggbb or array of colors
         , opacity: 0 // Opacity of the lines
         , rotate: 0 // The rotation offset
         , direction: 1 // 1: clockwise, -1: counterclockwise
         , speed: 1 // Rounds per second
         , trail: 60 // Afterglow percentage
         , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
         , zIndex: 2e9 // The z-index (defaults to 2000000000)
         , className: 'spinner' // The CSS class to assign to the spinner
         , top: '50%' // Top position relative to parent
         , left: '50%' // Left position relative to parent
         , shadow: true // Whether to render a shadow
         , hwaccel: false // Whether to use hardware acceleration
         , position: 'absolute' // Element positioning
     }


        var grid = $("#jqGrid").jqGrid({
//            url: 'data.json',
//            editurl: 'clientArray',
//            datatype: "json",
            colModel: [
                {
                    label: 'Name',
                    name: 'name',
                    width: '30%'
                },
                {
                    label: 'Address',
                    name: 'street',
                    width: '35%'

                },
                {
                    label : 'Phone',
                    name: 'phone',
                    width: '15%',
                    key: true

                },
				{
                    label : 'Rating',
                    name: 'rating',
                    width: '20%'
                },
				{
                    label : 'Contact Details',
                    name: 'booking',
                    width: '25%'
                }
            ],
            loadonce: true,
            viewrecords: true,
            autowidth: true,
			height:428,
            rowNum: 10,
            pager: "#jqGridPager",
            onSelectRow: function (id) {
                if(marker)
                 marker.setMap(null);
                //var myGrid = $('#jqGrid'),
                //    selRowId = myGrid.jqGrid ('getGridParam', 'selrow'),
                //    celValue = myGrid.jqGrid ('getCell', selRowId, 'Phone');
                plot2(id);
            }
        });


        $('#jqGrid').navGrid('#jqGridPager',
                // the buttons to appear on the toolbar of the grid
                { edit: false, add: false, del: false, search: true, refresh: false, view: false, position: "left", cloneToTop: false },
                // options for the Edit Dialog
                {
                    editCaption: "The Edit Dialog",
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                },
                // options for the Add Dialog
                {
                    
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                },
                // options for the Delete Dailog
                {
                    url:"data.json",
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                });

      //});


function spinnerload(action,id){
    if(action.toString() == "show"){
        target = document.getElementById(id);
        spinner = new Spinner(opts).spin(target);
    } else {
        spinner.stop();
    }

}

function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}


function getlatlongforsearch(){
    if(marker)
        marker.setMap(null);
    show('loading', true);
    spinnerload("show","find_doctor");
    $('#jqGrid').jqGrid("clearGridData");
    var add = "San Jose",lat,lng;
    if(document.getElementById( "zipcode" ).value)
      add = document.getElementById( "zipcode" ).value;
    add=add.replace(/"/g,"");
    var url="http://api.opencagedata.com/geocode/v1/json?query="+add+"&pretty=1&key=79c0c9ca6d5842c14b32a2b1f56e28ae";
    $.ajax({
        url:url,
        success:function(res) {
            lat = parseFloat(res.results[0].geometry.lat);
            lng = parseFloat(res.results[0].geometry.lng);
            //console.log(lat, lng);
            getDocInfo(lat, lng);
        }
    });


}

function getDocInfo(lat,lng){
	var xmlhttp= new XMLHttpRequest();
	var speciality,ailment;
	
	speciality = document.getElementById( "doclist" ).value.toLowerCase();
	ailment= document.getElementById( "ail").value;

	var ailment= document.getElementById( "ail").value;
	var url= "https://api.betterdoctor.com/2015-09-22/doctors?limit=100&user_key=6218a67e1beb7b0506ec77c9ad3e4e10";
	var query;
	if(speciality != ""){
	url=url+"&specialty_uid="+speciality+"&user_location="+lat+","+lng;
	}
    if(ailment){
        url+="&query="+ailment+"&user_location="+lat+","+lng;
    } else {
        url+="&query="+speciality;
    }
    $.ajax({
        url:url,
        success:function(res) {
            myFunction(res);
        }
    });

}


function myFunction(arr) {
	
    var out = "";
	var lat,lon;
    dr_data = arr;
	var t = new Array;
	var cnt = 0;
	arr.data.map(function(i){
	t[cnt]={};
	t[cnt].name= "<img width='48px' src='"+i.profile.image_url+"'> "+i.profile.first_name + " " + i.profile.last_name;
	t[cnt].street=i.practices[0].visit_address.street+","+i.practices[0].visit_address.city+","+i.practices[0].visit_address.state;
        t[cnt].lat=i.practices[0].visit_address.lat;
        t[cnt].lon=i.practices[0].visit_address.lon;
	try{
	t[cnt].rating="<img src='"+i.ratings[0].image_url_small+"'>"+" ("+i.ratings[0].rating+")";
	t[cnt].booking= "<button onclick='window.open(\""+i.ratings[0].provider_url+"\", \"_blank\")'>Contact</button>";
	} catch(e){
		t[cnt].rating="NA";
		t[cnt].booking= "NA";
	}
	t[cnt].phone= i.practices[0].phones[0].number;
	
	cnt++;
	});	
	var grid = $("#jqGrid").jqGrid('clearGridData').jqGrid('setGridParam', {
                    datatype: 'local',
                    data: t
                });
                grid[0].refreshIndex();
                grid.trigger('reloadGrid');
    spinnerload(1,"find_doctor");
    show('loading', false);
}

function plot2(ad) {
    var image = 'http://labs.google.com/ridefinder/images/mm_20_green.png';
    var url="http://api.opencagedata.com/geocode/v1/json?query="+ad+"&pretty=1&key=79c0c9ca6d5842c14b32a2b1f56e28ae";
    var lat, lng,add;
    dr_data.data.map(function(i) {
        if(i.practices[0].phones[0].number === ad){
            lat = i.practices[0].lat;
            lng = i.practices[0].lon;
            add = i.practices[0].visit_address.street+", "+i.practices[0].visit_address.city+", "+i.practices[0].visit_address.state;
        }
    });
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
        title: add
    });
    marker.setMap(map);
    map.setCenter(new google.maps.LatLng(parseFloat(lat), parseFloat(lng)));
    map.setZoom(15);

}



function init(){
	
 var myLatLng = {lat: 39.320980, lng: -111.093731};

   map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });
	
}




