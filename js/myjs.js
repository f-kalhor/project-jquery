$(document).ready(function(){
	timer();
	
	var fox;
	var myStudent = [{name : "ali"   , Turn : 12}, 
					 {name : "hamid" , Turn : 19},
					 {name : "Reza"  , Turn : 15}];	
		myRead();	

		$("#fn").keyup(myRead);
		$("#ft").keyup(myRead); 
		
		var mySort = 1 ;
	function sortN(){
		myStudent.sort(function(a, b){
				   let x = a.name.toLowerCase();
				   let y = b.name.toLowerCase();
				   if (x < y) {return -1 * mySort;}
				   if (x > y) {return 1 * mySort;}
				   return 0;
		})
			mySort *= -1 ;
			myRead()
	}
	function sortTurn(){
		myStudent.sort(function(a, b){return (a.Turn - b.Turn)* mySort});
		 mySort *= -1;
		 myRead();
	}
	
	$("#sn").click(sortN);
	$("#st").click(sortTurn);
	
	function myRead(){
		let t = ""; 
		let filterName= $("#fn").val();
		let filterTurn= $("#ft").val();
			if(myStudent.length == 0 ){
					t ="<tr><td colspan = '5' > no Data </td></tr>"
					$("#NOStudent").html("--")
					$("#maxturn").html("--")
					$("tbody").html(t);
					
			}else{		
			for(let i in myStudent){
				if(myStudent[i].name.indexOf(filterName) != -1 
				  && ( myStudent[i].Turn == filterTurn||filterTurn == '' ))
				
				t += "<tr id ="+i+"> "+
					"<td>"+ (Number(i)+ 1) +"</td>"+
					"<td class ='edit'>"+ myStudent[i].name +"</td>"+
					"<td>"+ myStudent[i].Turn +"</td>"+
					"<td><img class ='u' src ='img/edit.png'></td>"+
					"<td><img class ='d' src ='img/delete.png'></td>"+
					"</tr>"
			}
			if(myStudent.length == 50){
				$("#NOStudent").css({"color": "red"})
				$("#add").attr("disabled",true)
			}else{
				$("#NOStudent").css({"color": "blue"})
				$("#add").attr("disabled",false)
			}	
			$("tbody").html(t);	
			$("#NOStudent").html(myStudent.length)
			$("#maxturn").html(myArrayMax(myStudent))
			
			$(".u").on("click",myEdit)
			$(".d").on("click",myDelete2)
			
			
			}	
		}
		
		function myArrayMax(arry){
			let myMax = -Infinity;
			if(arry.length != 0){
			for(let i in arry)
				if(arry[i].Turn > myMax )
					myMax = arry[i].Turn
				return myMax;
				}else{ 
					myMax = '---'	
				}
				return myMax;
		}
		
		
		function myEdit(){
			if(!$(this).hasClass('a')){
				$(this).attr("src","img/save.png").addClass('a')
						.parent().siblings('.edit').each(function(){
						let t= $(this).text()
						$(this).html('<input value="'+t+'">')
						
			})
				$(".u:not(.a)").off("click",myEdit).hide();
			
			}else{
				$(this).attr("src","img/Edit.png").removeClass('a')
				let i =$(this).parent().parent().attr("id");
				$(this).parent().siblings(".edit").each(function(){
					let newName = $(this).children().val();
					myStudent[i].name = newName;
				})
				
				myRead();
			}
			
		}
	$("#add").click(function(){
		event.preventDefault()
		let x;
		 myData = {name : '' , Turn : 0 } 
		
		do{
			 var isNotOk = false ; 
		 x = Math.floor(Math.random() * 50) + 1;
		 for(let i in myStudent)
			 if(myStudent[i].Turn == x){
				isNotOk = true;
				 break;
			}
		}while(isNotOk);
			myData.Turn = x;
			myData.name = $("#sName").val();
			
			if(myData.name != ""){
				myStudent.push(myData)
				$("input").val("");
			}
			if(myStudent.length == 50)
				$(this).attr("disabled", true)
				$("#mydel").attr("disabled", false)
			$("input").val("");	
			
			myRead();
			
				 
			})
			// function Delete Last button
	$("#mydel").click(function(){
		event.preventDefault()
		$("#modal").fadeIn();
		myRead()
			
	})
	$("#ok").click(function(){
		 let myPOp = myStudent.pop();
		if(myStudent.length == 0)
			$('#mydel').attr("disabled", true)
			$("#add").attr("disabled", false)
			$('#modal').fadeOut();
			$('#info').fadeIn().children("p").html(" you deleted"+'<span>'+myPOp.name+'</span>'+"with Turn"+'<span>'+myPOp.Turn+'</span>'+"from Table")
			setTimeout(function(){$('#info').fadeOut()} ,1500)
			
			myRead();
		
	})
	
	function myDelete(myIndex){
		let myClean; 
		 myClean = myStudent.splice(myIndex,1);
		if(myStudent.length == 0)
			$('#mydel').attr("disabled", true)
			$("#add").attr("disabled", false)
			$('#modal1').fadeOut();
			$('#info1').fadeIn().children("p").html("you deleted"+'<span>'+ myClean[0].name+'</span>'+"with Turn"+'<span>'+ myClean[0].Turn+'</span>'+"from Table")
			setTimeout(function(){$('#info1').fadeOut()} ,1500)
			myRead();
			
	}
	function myDelete2(){
		fox =$(this).parent().parent().attr("id");
			$("#modal1").fadeIn()
		
	}
	$("#ok1").click(function(){
		
		myDelete(fox);
	})	
	
	
	$("#cancel").click(function(){
			$('#modal').fadeOut();
			myRead();
	})
	$("#cancel1").click(function(){
			$('#modal1').fadeOut();
			myRead();
	})
	
	$(".pic").click(function(){
			$('#modal').fadeOut();
			$('#modal1').fadeOut();
			myRead();
	})
	$(".pic").hover(function(){
  $(this).attr("src", "img/bullet2.png");
	}, function(){
  $(this).attr("src", "img/bullet1.png");
	});
	$("#dl").click(function(){
		$("#info").fadeOut();
	})
	$("#dl1").click(function(){
		$("#info").fadeOut();
	})
		$(window).scroll(function(){
				
		var st = $(this).scrollTop()
		   
			if( st >= 200 )
				$("#gotop").fadeIn()	
			else
				$("#gotop").fadeOut()	
		console.log(st)
		})
		
		$("#gotop").click(function(){
			$("body,html").animate({"scrollTop":"0"},3000)
		})
		var T;
		$("table").contextmenu(function(){
				
			let y = event.y;
			let x = event.x;
			let w = $(window).width()
			let wc = $("#mycantent").width()
			
			if( x + wc >= w )
				x -= wc
				
			event.preventDefault();
			$("#mycantent").css({ left : x + "px", top: y + "px" }).fadeIn();
			clearTimeout(T)
			T = setTimeout(myOut,10000);
				
			
			})
			$("*").click(myOut);
			
			function myOut(){
				$("#mycantent").fadeOut()
			}
	
		$("#a").click(function(){
			$("tr:nth-child(odd) td").css("background","#aaa")
			$("tr:nth-child(even) td").css("background","#555")
			console.log($("tr:nth-child(even) td").css("background"))
			console.log($("tr:nth-child(odd) td").css("background"))
			})	

		$("#b").click(function(){
			$("tr:nth-child(odd) td").css("background","#bbb")
			$("tr:nth-child(even) td").css("background","#666")
			console.log($("tr:nth-child(even) td").css("background"))
			console.log($("tr:nth-child(odd) td").css("background"))
		})	

		$("#c").click(function(){
			$("tr:nth-child(odd) td").css("background","#ccc")
			$("tr:nth-child(even) td").css("background","#777")
			console.log($("tr:nth-child(even) td").css("background"))
			console.log($("tr:nth-child(odd) td").css("background"))
		})	

		$("#d").click(function(){
			$("tr:nth-child(odd) td").css("background","#ddd")
			$("tr:nth-child(even) td").css("background","#888")
			console.log($("tr:nth-child(even) td").css("background"))
			console.log($("tr:nth-child(odd) td").css("background"))
		})	

		$("#e").click(function(){
			$("tr:nth-child(odd) td").css("background","#eee")
			$("tr:nth-child(even) td").css("background","#999")
			console.log($("tr:nth-child(even) td").css("background"))
			console.log($("tr:nth-child(odd) td").css("background"))
		})	
		$("#h").click(function(){
			$("tr:nth-child(odd) td").css("background","#fff")
			$("tr:nth-child(even) td").css("background","#aaa")
			console.log($("tr:nth-child(even) td").css("background"))
			console.log($("tr:nth-child(odd) td").css("background"))
			
		})	
		

	setInterval(timer,1000);
	function timer(){
		let t = new Date()
		let h = t.getHours().toString();
		console.log(h)
		let h2 = h.padStart(2,0);
		 let m= t.getMinutes().toString();
		 let m2 = m.padStart(2,0);
		 let s =t.getSeconds().toString();
		let s2 = s.padStart(2,0);
		 $("#time").text( h2+":"+m2+":"+s2 )
	}	
			
	
})