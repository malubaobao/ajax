function ajax({
	type,
	url,
	data,
	dataType
}){
	return new Promise(callback=>{
		function createXML(){
			var xhr=null
			if(window.XMLHttpRequest){
				xhr=new XMLHttpRequest()
			}else{
				xhr=new ActiveXObject("Microsoft.XMLHttp")	
			}
			return xhr
		}
		var xhr=createXML()
		if(type.toLowerCase()=="get"&&data!==undefined){
			url+="?"+data
		}
		xhr.open(type,url,true)
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					var resData=xhr.responseText
					if(dataType!==undefined&&dataType.toLowerCase()=="json"){
						resData=JSON.parse(resData)
					}
					callback(resData)
				}
			}
		}
		if(type.toLowerCase()=="post"){
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
		}
		xhr.send(type.toLowerCase()=="post"?data:null)
	})	
}