function my_func(idval,part){
	var symptom = document.getElementById(idval).text;
	$("#symptomlist").find("#"+idval).slideUp();
	$("#choices").append('<a href="javascript: void()" id="'+idval+'" class="list-group-item" onclick="my_func2(this.id)">'+symptom+'<span class="glyphicon glyphicon-remove" style="float:right;color:#b32d00;"></a>');
	datapull(symptom,part,idval);
}
function my_func2(idval){
	$("#choices").find("#"+idval).remove();
	$("#symptomlist").find("#"+idval).slideDown();
	$("#possiblecondition").find("#"+idval).remove();
}
function datapull(symp,part,idval){
	var str = part.split(",")
	for(i=0;i<str.length;i++){
		var condition = str[i];
		$("#possiblecondition").append('<a href="javascript: void()" id="'+idval+'" class="list-group-item">'+condition+'</a>');
   }
}
var httpRequest;
function updateMe( value){ 
	var part = value;
	$("a").remove(".list-group-item")
	
	//make AJAX call here to fetch JSON data of specific part
	if (window.XMLHttpRequest){
		httpRequest=new XMLHttpRequest();
	}
	else{
		httpRequest=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	//httpRequest=new XMLHttpRequest();
	httpRequest.onreadystatechange=recieveMessageFromServer;
	var url = "https://pixels-health.herokuapp.com/data/"+part;
	
	httpRequest.open("GET", url,true);
	httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	httpRequest.send();

}

function recieveMessageFromServer(){
	if (httpRequest.readyState==4){
		var activity= httpRequest.responseText;
		var datalist = JSON.parse(activity);
		var id =1;
		for(var k1 in datalist){
			var symp = k1;
			$("#symptomlist").append('<a href="javascript: void()" id="'+id+'" rel="'+datalist[k1]+'"class="list-group-item" onclick="my_func(this.id,this.rel)">'+symp+'<span class="glyphicon glyphicon-plus" style="float:right;color:#9999ff;"></span></a>');
			id=id+1 ;
		}
	}
}