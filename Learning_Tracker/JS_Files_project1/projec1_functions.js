function addValueToPassword(button){
	var currVal = $("#passcode").val();
	if (button ==="bksp"){
		$("#passcode").val(currVal.substring(0,currVal.length -1));
	}else{
		$("#passcode").val(currVal.concat(button));
	}
};

function saveSignUpUser(){
	var signupFirstName=document.getElementById("signupFirstName").value;
	var signupLastName=document.getElementById("signupLastName").value;
	var dateOfBirth=document.getElementById("dateOfBirth").value;
	var signupSinNumber=document.getElementById("signupSinNumber").value;
	var addPassword =document.getElementById("addPassword").value;
	var confirmPassword = document.getElementById("confirmPassword").value;
	//var lensin=signupSinNumber.toString().length;
	if(signupFirstName=="" || signupLastName=="" || dateOfBirth=="" || addPassword=="" || confirmPassword=="" )
	{
		alert("All feilds are required");
		return false;
	}
	if(signupSinNumber == "")
	{
		alert("Email feild is required");
	}
	else if(addPassword == confirmPassword )
	{
		var user =
		{
		"FirstName":$("#signupFirstName").val(),
		"LastName":$("#signupLastName").val(),
		"DateOfBirth":$("#dateOfBirth").val(),
		"SINNumber":$("#signupSinNumber").val(),
		"NewPassword":$("#confirmPassword").val(),
		"Gender":$("#signupGenderType option:selected").val()
		};
		try
		{
			localStorage.setItem("user",JSON.stringify(user));
			localStorage.removeItem("agreedToLegal");
			alert("Saving Information");
			$.mobile.changePage("#legalNotice");
			window.location.reload();
			if(user!=null)
			{
				$("#updateFirstName").val(user.FirstName);
				$("#updateLastName").val(user.LastName);
				$("#updateDateOfBirth").val(user.DateofBirth);
				$("#updateSinNumber").val(user.SINNumber);
				$("#updateAddPassword").val(user.NewPassword);
				$('#updateGenderType option[value='+user.Gender+']').attr('selected','selected');
				$("#updateGenderType option:selected").val(user.Gender);
				$('#updateGenderType').selectmenu('refresh',true);
			}
		}
		catch(e)
		{
			if(window.navigator.vendor === "Google Inc.")
			{
				if(e == DOMException.QUOTA_EXCEEDED_ERR)
				{
					alert("Error: Local Storage limit Exceeds.");
				}else if(e == QUOTA_EXCEEDED_ERR)
				{
					alert("Error: Saving to local storage.");
				}
			}
			console.log(e);
		}
	}else{
		alert("The password you have entered do not match Please try again!");
		window.location.reload();
	}
};

function saveDisclaimer(){
	localStorage.setItem("agreedToLegal","true");
	$.mobile.changePage("#pageMenu");
	window.location.reload();
};

function saveUserForm(){
	var addPassword =document.getElementById("updateAddPassword").value;
	var confirmPassword = document.getElementById("updateConfirmPassword").value;
	var updateSinNumber=document.getElementById("updateSinNumber").value;
	var lensin=updateSinNumber.toString().length;
  if(addPassword == confirmPassword){
		var user ={
		"FirstName":$("#updateFirstName").val(),
		"LastName":$("#updateLastName").val(),
		"DateOfBirth":$("#updateDateOfBirth").val(),
		"SINNumber":$("#updateSinNumber").val(),
		"NewPassword":$("#updateConfirmPassword").val(),
		"Gender":$("#updateGenderType option:selected").val()
		};
		try{
			localStorage.setItem("user",JSON.stringify(user));
			alert("Saving Information");
			$.mobile.changePage("#pageMenu");
			window.location.reload();
			if(user!=null){
				$("#updateFirstName").val(user.FirstName);
				$("#updateLastName").val(user.LastName);
				$("#updateDateOfBirth").val(user.DateofBirth);
				$("#updateSinNumber").val(user.SINNumber);
				$("#updateAddPassword").val(user.NewPassword);
				$('#updateGenderType option[value='+user.Gender+']').attr('selected','selected');
				$("#updateGenderType option:selected").val(user.Gender);
				$('#updateGenderType').selectmenu('refresh',true);
			}
		}catch(e){
			if(window.navigator.vendor === "Google Inc."){
				if(e == DOMException.QUOTA_EXCEEDED_ERR){
					alert("Error: Local Storage limit Exceeds.");
				}else if(e == QUOTA_EXCEEDED_ERR){
					alert("Error: Saving to local storage.");
				}
			}
			console.log(e);
		}
	}else{
		alert("Your Confirm Password is not the same with New Password Please enter agian.");
		window.location.reload();
	}
};

function showUserForm(){
	var user = JSON.parse(localStorage.getItem("user"));
	if(user!=null){
		$("#updateFirstName").val(user.FirstName);
		$("#updateLastName").val(user.LastName);
		$("#updateDateOfBirth").val(user.DateofBirth);
		$("#updateSinNumber").val(user.SINNumber);
		$("#updateAddPassword").val(user.NewPassword);
		$('#updateGenderType option[value='+user.Gender+']').attr('selected','selected');
		$("#updateGenderType option:selected").val(user.Gender);
		$('#updateGenderType').selectmenu('refresh',true);
	}
};

function redirectPage(){
	var password = getPassword();
	var userName = getUserName();
	console.log(password);
	console.log(userName);

	if(document.getElementById("passcode").value == password && document.getElementById("username").value === userName){
		if(localStorage.getItem("agreedToLegal") === null){
			alert("You need to sign the Legal Notice first.");
			$("#btnEnter").attr("href","#legalNotice").button();
		}else if(localStorage.getItem("agreedToLegal") === "true"){
			$("#btnEnter").attr("href","#pageMenu").button();
		}
	}else{
		alert("Incorrect username/password, please try agian.");
	}
};

function getPassword(){
	if(typeof(Storage) === "undefined"){
		alert("Your browser does not support HTML5 localStorage. Try upgrading.");
	}else if(localStorage.getItem("user")!==null){
		return JSON.parse(localStorage.getItem("user")).NewPassword;
	}else{
		return "9999";
	}
}

function getUserName(){
	if(typeof(Storage) === "undefined"){
		alert("Your browser does not support HTML5 localStorage. Try upgrading.");
	}else if(localStorage.getItem("user")!==null){
		return JSON.parse(localStorage.getItem("user")).FirstName;
	}else{
		return "Peter";
	}
}

function getLastName(){
	if(typeof(Storage) === "undefined"){
		alert("Your browser does not support HTML5 localStorage. Try upgrading.");
	}else if(localStorage.getItem("user")!==null){
		return JSON.parse(localStorage.getItem("user")).LastName;
	}else{
		return "Peter";
	}
}

function getDateOfBirth(){
	if(typeof(Storage) === "undefined"){
		alert("Your browser does not support HTML5 localStorage. Try upgrading.");
	}else if(localStorage.getItem("user")!==null){
		return JSON.parse(localStorage.getItem("user")).DateOfBirth;
	}else{
		return "Peter";
	}
}

function getSINNumber(){
	if(typeof(Storage) === "undefined"){
		alert("Your browser does not support HTML5 localStorage. Try upgrading.");
	}else if(localStorage.getItem("user")!==null){
		return JSON.parse(localStorage.getItem("user")).SINNumber;
	}else{
		return "Peter";
	}
}

function getGender(){
	if(typeof(Storage) === "undefined"){
		alert("Your browser does not support HTML5 localStorage. Try upgrading.");
	}else if(localStorage.getItem("user")!==null){
		return JSON.parse(localStorage.getItem("user")).Gender;
	}else{
		return "Peter";
	}
}

function CleanHistory(){
	var currRecords = JSON.parse(localStorage.getItem("tbRecords"));
	if(currRecords==null){
		alert("There is no record. Please first create a record to perform this operation.")
	}else{
		localStorage.removeItem("tbRecords");
		localStorage.removeItem("grRecords");
		setInfo();
		alert("All records have been deleted.");
	}
};

function CheckAddRecord(){
	$("#btnSubmitRecord").val("Add Record");
};

function setInfo(){
	document.getElementById("tblRecords").innerHTML="";
	document.getElementById("divUserSection").innerHTML="";
	var FirstName = getUserName();
	var LastName = getLastName();
	var DateOfBirth = getDateOfBirth();
	var SINNumber = getSINNumber();
	var Gender = getGender();
	userInfo = "<li>User's Name: "+FirstName+" "+LastName+"</li><li>Date of Birth: "+DateOfBirth+"</li><li>Email: "+SINNumber+"</li><li>Gender: "+Gender+"</li>";
	document.getElementById("divUserSection").innerHTML = userInfo;
	var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
	if(tbRecords!=null){
		table = "<tr><th><b>Date</b></th><th><b>Expense Type</b></th><th><b>Expense Amount</b></th><th><b>Edit</b></th><th><b>Delete</b></th></tr>";
		for(i=0;i<tbRecords.length;i=i+1){
			var tbRecord = tbRecords[i];
			tmpDate = tbRecord.Date;
			tmpExpenseType = tbRecord.ExpenseType;
			tmpExpenseAmount = tbRecord.ExpenseAmount;
			table += "<tr><th>"+tmpDate+"</th><th>"+tmpExpenseType+"</th><th>"+tmpExpenseAmount+"</th><th><button onclick='CheckEditRecord("+i+");' data-icon='edit'>Edit</button></th><th><button onclick='DeleteRecord("+i+");' data-icon='delete'>Delete</button></th></tr>";
			console.log(i);
		};
		document.getElementById("tblRecords").innerHTML = table;

	}
};

$(document).on("pageshow", function () {
 	if ($('.ui-page-active').attr('id') =="pageUserInfo") {
    	showUserForm();
 	}else if ($('.ui-page-active').attr('id') == "pageRecords"){

	}else if ($('.ui-page-active').attr('id') == "pageAdvice"){
    	drawAdvice();
    	resizeGraph();
	}else if ($('.ui-page-active').attr('id') == "pageGraph"){
    	drawGraph();
    	resizeGraph();
	}
});

function resizeGraph(){
	if ($(window).width() < 700) {
    	$("#GraphCanvas").css({"width": $(window).width() - 50});
    	$("#AdviceCanvas").css({"width": $(window).width() - 50});
	}
};

$(window).resize(function(){
 	resizeGraph();
});

function DeleteRecord(index){
	var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
	var grRecords = JSON.parse(localStorage.getItem("grRecords"));
	var dltRecord = tbRecords[index];
	var newtbRecords = [];
	var newgrRecords = [];
	for(i=0;i<tbRecords.length;i=i+1){
		if(i!=index){
			var tbRecord = tbRecords[i];
			newtbRecords.push(tbRecord);
		}
	}

	for(i=0;i<grRecords.length;i=i+1){
		grRecord = grRecords[i];
		if(dltRecord.Date == grRecord.Date){
			if(grRecord.Expense!=dltRecord.ExpenseAmount){
				var tmpdltRecord ={
				"Date":grRecord.Date,
				"Expense":Number(grRecord.Expense)-Number(dltRecord.ExpenseAmount)
				};
				newgrRecords.push(tmpdltRecord);
			}
		}else{
			newgrRecords.push(grRecord);
		}
	}

	localStorage.setItem("grRecords",JSON.stringify(newgrRecords));
	localStorage.setItem("tbRecords",JSON.stringify(newtbRecords));
	setInfo();
	alert("This record has been deleted.");
};

function CheckEditRecord(index){
	$("#btnSubmitRecord").val("Update Record");
	localStorage.setItem("tmpUpdate",index);
	$.mobile.changePage("#pageNewRecordForm");
};

function editRecord(){
	index = localStorage.getItem("tmpUpdate");
	var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
	var newRecord = {
		"Date":$("#datExpenseDate").val(),
		"ExpenseType":$("#txtType").val(),
		"ExpenseAmount":$("#txtAmount").val()
	}
	var grRecords = JSON.parse(localStorage.getItem("grRecords"));
	var udttbRecord = tbRecords[index];
	var newtbRecords = [];
	var newgrRecords = [];
	ifnewgrDate = "true";
	for(i=0;i<tbRecords.length;i=i+1){
		if(i!=index){
			var tbRecord = tbRecords[i];
			newtbRecords.push(tbRecord);
		}else{
			newtbRecords.push(newRecord);
		}
	}
	for(i=0;i<grRecords.length;i=i+1){
		var grRecord = grRecords[i];
		if(grRecord.Date!=newRecord.Date&&grRecord.Date!=udttbRecord.Date){
			newgrRecords.push(grRecord);
		}else if(grRecord.Date==newRecord.Date&&grRecord.Date==udttbRecord.Date){
			var udtgrRecord = {
				"Date":newRecord.Date,
				"Expense":Number(grRecord.Expense)-Number(udttbRecord.ExpenseAmount)+Number(newRecord.ExpenseAmount)
			};
			newgrRecords.push(udtgrRecord);
			ifnewgrDate = "false";
		}else if(grRecord.Date==udttbRecord.Date&&grRecord.Date!=newRecord.Date){
			if(grRecord.Expense!=udttbRecord.ExpenseAmount){
				var tmpudtRecord ={
				"Date":grRecord.Date,
				"Expense":Number(grRecord.Expense)-Number(udttbRecord.ExpenseAmount)
				};
				newgrRecords.push(tmpudtRecord);
			}
		}else if(grRecord.Date==newRecord.Date&&grRecord.Date!=udttbRecord.Date){
			ifnewgrDate = "false";
			var tmpudtRecord ={
				"Date":grRecord.Date,
				"Expense":Number(grRecord.Expense)+Number(newRecord.ExpenseAmount)
			};
			newgrRecords.push(tmpudtRecord);
		}
	}
	if(ifnewgrDate!="false"){
			var newgrRecord = {
				"Date":newRecord.Date,
				"Expense":newRecord.ExpenseAmount
			};
			newgrRecords.push(newgrRecord);
	}
	localStorage.setItem("grRecords",JSON.stringify(newgrRecords));
	localStorage.setItem("tbRecords",JSON.stringify(newtbRecords));
	setInfo();
	alert("Saving Information");
	cleantmpUpdate();
	window.location.href="#pageRecords";
};

function checkAddOrEditRecord(){
	var formOperation = $("#btnSubmitRecord").val();
	if(formOperation == "Add Record"){
		addRecord();
		$.mobile.changePage("#pageRecord");
	}else if(formOperation == "Update Record"){
		editRecord();
		$.mobile.changePage("#pageRecord");
	}
	return false;
};

function cleantmpUpdate(){
	localStorage.removeItem("tmpUpdate");
};

function addRecord(){
		
		var record = {
			"Date":$("#datExpenseDate").val(),
			"ExpenseType":$("#txtType").val(),
			"ExpenseAmount":$("#txtAmount").val()
		};
		var tmpgrDate = $("#datExpenseDate").val();
		var tmpgrExpense = $("#txtAmount").val();

		var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
		if(tbRecords == null){
			tbRecords = [];
		}
		tbRecords.push(record);
		localStorage.setItem("tbRecords",JSON.stringify(tbRecords));

		var grRecords = JSON.parse(localStorage.getItem("grRecords"));
		if(grRecords == null){
			grRecords = [];
		};
		var newgrRecords = [];
		ifnewgrDate = "true";
		for(i=0;i<grRecords.length;i=i+1){
			grRecord = grRecords[i];
			grDate = grRecord.Date;
			if(tmpgrDate!=grDate){
				newgrRecords.push(grRecord);
			}else if(tmpgrDate = grDate){
				var tmpgrRecord = {
					"Date":tmpgrDate,
					"Expense":Number(tmpgrExpense)+Number(grRecord.Expense)
				};
				newgrRecords.push(tmpgrRecord);
				ifnewgrDate = "false";
			}
		}
		if(ifnewgrDate!="false"){
			var tmpgrRecord = {
				"Date":tmpgrDate,
				"Expense":tmpgrExpense
			};
			newgrRecords.push(tmpgrRecord);
		}
		localStorage.setItem("grRecords",JSON.stringify(newgrRecords));
		setInfo();
		alert("Saving Information");
		window.location.href="#pageRecords";

};

function drawGraph(){
	 if (localStorage.getItem("tbRecords") === null) {
	alert("No records exist.");

	$(location).attr("href", "#pageMenu");
	}else {
		 var c = document.getElementById("GraphCanvas");
		 var ctx = c.getContext("2d");

		 ctx.fillStyle = "#FFFFFF";
		 ctx.fillRect(0, 0, 500, 500);

			var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
			HoursArr = []
			Datearr = []

			 tbRecords.sort(function (a, b) {
						return  +new Date(a.Date) - +new Date(b.Date);
				});
				console.log(tbRecords);

		for (var i = 0; i < tbRecords.length; i++) {
				var date = new Date(tbRecords[i].Date);
				var m = date.getMonth() + 1;
				var d = date.getDate() + 1;
				Datearr[i] = (m + "/" + d);
				HoursArr[i] = parseFloat(tbRecords[i].ExpenseAmount);
		}

		drawlines(HoursArr, 0, 0, Datearr)
		labelaxes()
		}
}

function drawlines(HoursArr, HoursUpper, HoursLower, Datearr){
			var expenseLine = new RGraph.Line("GraphCanvas",HoursArr, 0, 0)
			.Set("labels", Datearr)
			.Set("colors", ["blue"])
			.Set("shadow", true)
			.Set("shadow.offsetx", 1)
			.Set("shadow.offsety", 1)
			.Set("linewidth", 1)
			.Set("numxticks", 6)
			.Set("scale.decimals", 2)
			.Set("xaxispos", "bottom")
			.Set("gutter.left", 40)
			.Set("tickmarks", "filledcircle")
			.Set("ticksize", 5)
			.Set("chart.labels.ingraph", [, , ["Hours","blue", "yellow", 1, 80], , ])
			.Set("chart.title", "Quality Learning")
			.Draw();
}

function drawAdvice(){
	var grRecords = JSON.parse(localStorage.getItem("grRecords"));
	sum = 0;
	var maxdate = new Date(grRecords[0].Date);
	var mindate = new Date(grRecords[0].Date);
	for(i=0;i<grRecords.length;i=i+1){
		sum = sum+Number(grRecords[i].Expense);
		var currdate = new Date(grRecords[i].Date);
		console.log(currdate);
		if(maxdate.getTime()<currdate.getTime()){
			maxdate = currdate;
		}
		if(mindate.getTime()>currdate.getTime()){
			mindate = currdate;
		}
	}
	var days = Number((maxdate.getTime()-mindate.getTime())/86400000+1);
	console.log(days);
	avgExpense=Number(sum)/Number(days);
	avgExpense = avgExpense.toFixed(2);
	var canvas = document.getElementById("AdviceCanvas");
	var ctx = canvas.getContext("2d");
	if(avgExpense<1){
		alert("Your daily hours is smaller than 1. We can't provide advice based on it.");
	}else{
		drawTxtAdvice(ctx,avgExpense);
	}
	ctx.stroke();
};

function drawTxtAdvice(ctx,avgExpense){
	ctx.font = "22px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("Your current avg Learning is "+avgExpense+".",25,320);
	ctx.fillText("Your target avg hours range  per week is 30 ",25,350);
	levelWrite(ctx,avgExpense);
	levelMeter(ctx,avgExpense);
};

function levelWrite(ctx,avgExpense){
	if((avgExpense>=1)&&(avgExpense<=10)){
		writeAdvice(ctx,"green");
	}else if((avgExpense>10)&&(avgExpense<=50)){
		writeAdvice(ctx,"yellow");
	}else{
		writeAdvice(ctx,"red");
	}
};

function writeAdvice(ctx,level){
	var adviceLine1 = "";
	var adviceLine2 = "";
	if(level == "red"){
		adviceLine1 = "Please take care of the learning.";
		adviceLine2 = "It's exceedingly more than set limit.";
	}else if(level == "yellow"){
		adviceLine1 = "The learning needs to be checked!";
	}else if(level == "green"){
		adviceLine1 = "Your learning is on track.";
	}
};

function levelMeter(ctx,avgExpense){
	if(avgExpense<=100){
		var cg = new RGraph.CornerGauge("AdviceCanvas",0,100,avgExpense).Set("chart.colors.ranges",[
			[50,100,"red"],
			[10,50,"yellow"],
			[1,10,"#0f0"]
		]);
	}else{
		var cg = new RGraph.CornerGauge("AdviceCanvas",0,avgExpense,avgExpense).Set("chart.colors.ranges",[
			[50,100,"red"],
			[10,50,"yellow"],
			[0.01,0.1,"#0f0"],
			[100.01,avgExpense,"red"]
		]);
	}
	drawMeter(cg);
};

function drawMeter(g){
	g.Set("chart.value.text.units.post"," Hours")
	.Set("chart.value.text.boxed",false)
	.Set("chart.value.text.size",14)
	.Set("chart.value.text.font","Verdana")
	.Set("chart.value.text.bold",true)
	.Set("chart.value.text.decimals",2)
	.Set("chart.shadow.offsetx",5)
	.Set("chart.shadow.offsety",5)
	.Set("chart.scale.decimals",2)
	.Set("chart.title","Learning Limit")
	.Set("chart.radius",250)
	.Set("chart.centerx",50)
	.Set("chart.centery",250)
	.Draw();
};
