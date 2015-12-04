/*
This is empty on purpose! Your code to build the resume will go here.
 */
var bio = {
	"name": "Dawei Xia",
	"role": "Teacher & Web Developer",
	"contacts": {
		"mobile": "15555555555",
		"email": "example@example.com",
		"github": "github.com/DaweiXia",
		"twitter": "@David",
		"location": "Shenyang China"
	},
	"welcomMessage": "Welcom to my site! I am Dawei!",
	"skills": ["Python", "HTML", "CSS", "JS", "JQuery"],
	"biopic": "https://avatars1.githubusercontent.com/u/5789704?v=3&s=460",
	"display": function() {
		function addContacts(id){

		}

		$("#header").prepend(HTMLheaderRole.replace("%data%", bio.role));
		$("#header").prepend(HTMLheaderName.replace("%data%", bio.name));

		$("#topContacts").append(HTMLmobile.replace("%data%", bio.contacts.mobile));
		$("#topContacts").append(HTMLemail.replace("%data%", bio.contacts.email));
		$("#topContacts").append(HTMLtwitter.replace("%data%", bio.contacts.twitter));
		$("#topContacts").append(HTMLgithub.replace("%data%", bio.contacts.github));
		$("#topContacts").append(HTMLlocation.replace("%data%", bio.contacts.location));

		$("#header").append(HTMLbioPic.replace("%data%", bio.biopic));
		$("#header").append(HTMLwelcomeMsg.replace("%data%", bio.welcomMessage));
		$("#header").append(HTMLskillsStart);
		for(i in bio.skills){
			$("#skills").append(HTMLskills.replace("%data%", bio.skills[i]));
		}

		$("#footerContacts").append(HTMLmobile.replace("%data%", bio.contacts.mobile));
		$("#footerContacts").append(HTMLemail.replace("%data%", bio.contacts.email));
		$("#footerContacts").append(HTMLtwitter.replace("%data%", bio.contacts.twitter));
		$("#footerContacts").append(HTMLgithub.replace("%data%", bio.contacts.github));
		$("#footerContacts").append(HTMLlocation.replace("%data%", bio.contacts.location));
	}
};


var education = {
	"schools": [
		{
			"name": "Huaibei Normal University",
			"location": "Huaibei China",
			"degree": "Bachelor",
			"majors": ["Applications of Computer Technology"],
			"dates": 2011,
			"url": "http://www.hbcnc.edu.cn/"
		},
		{
			"name": "Shenyang Aerospace Universiyt",
			"location": "Shenyang China",
			"degree": "Master",
			"majors": ["Computer Technology"],
			"dates": 2015,
			"url": "http://www.sau.edu.cn/"
		}
	],

	"onlineCourses": [
		{
			"title": "Introduction to Computational Thinking and Data Science",
			"school": "edx",
			"date": 2015,
			"url": "https://courses.edx.org/courses/course-v1:MITx+6.00.2x_3+1T2015/info"
		},
		{
			"title": "Introduction to Computer Science and Programming Using Python",
			"school": "edx",
			"date": 2015,
			"url": "https://courses.edx.org/courses/MITx/6.00.1x_5/1T2015/info",
		}
	],

	"display": function() {
		$("#education").append(HTMLschoolStart);
		for(school in education.schools){
			var schoolName = HTMLschoolName.replace("%data%", education.schools[school].name);
			var schoolDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
			$(".education-entry").append(schoolName + schoolDegree);
			$(".education-entry").append(HTMLschoolDates.replace("%data%", education.schools[school].dates));
			$(".education-entry").append(HTMLschoolLocation.replace("%data%", education.schools[school].location));
			for(major in education.schools[school].majors){
				$(".education-entry").append(HTMLschoolMajor.replace("%data%", education.schools[school].majors[major]));
			}
		}

		$("#education").append(HTMLonlineClasses);
		$("#education").append(HTMLschoolStart);
		for(course in education.onlineCourses){
			var onlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title);
			var onlineSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
			$(".education-entry:last").append(onlineTitle + onlineSchool);
			$(".education-entry:last").append(HTMLonlineDates.replace("%data%", education.onlineCourses[course].date));
			$(".education-entry:last").append(HTMLonlineURL.replace("%data%", education.onlineCourses[course].url));
		}
	}
};

var work = {
	"jobs": [
		{
			"employer": "Shenyang Northern Software Institute",
			"title": "Teacher",
			"location": "Shenyang China",
			"dates": "2015/04/01-Now",
			"description": "I am teaching Introduction to Programming(Python), Introdution to HTML&CSS and " +
			"Introdution to Computer Science in NSI. Except for this, I am responsible for practicing " +
			"professional skills of students."
		}
	],

	"display": function(){
		$("#workExperience").append(HTMLworkStart);
		for(job in work.jobs){
			var workEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
			var workTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
			$("div.work-entry").append(workEmployer + workTitle);

			$("div.work-entry").append(HTMLworkDates.replace("%data%", work.jobs[job].dates));
			$("div.work-entry").append(HTMLworkLocation.replace("%data%", work.jobs[job].location));
			$("div.work-entry").append(HTMLworkDescription.replace("%data%", work.jobs[job].description));
		}
	}
};

var projects = {
	"projects": [
		{
			"title": "Campus Ambassador of Coursera and MOOC Achademy",
			"dates": "2014/03/01-2015/03/01",
			"description": "Organize learning groups or activities that related to learning or MOOC to promote MOOC in Shenyang" +
			 "Aerospace Universiyt",
			"images": ["http://3.im.guokr.com/VwbwQvy11HNPq3hjeldVsnOQRL1nu3Zzr_SyERfV99eIAgAA5AEAAEpQ.jpg?imageView2/1/w/570/h/425"]
		}
	],

	"display": function(){
		$("#projects").append(HTMLprojectStart);
		for(project in projects.projects){
			$(".project-entry").append(HTMLprojectTitle.replace("%data%", projects.projects[project].title));
			$(".project-entry").append(HTMLprojectDates.replace("%data%", projects.projects[project].dates));
			$(".project-entry").append(HTMLprojectDescription.replace("%data%", projects.projects[project].description));
			for(image in projects.projects[project].images){
				$(".project-entry").append(HTMLprojectImage.replace("%data%", projects.projects[project].images[image]));
			}
		}
	}
};

var map = {
	"display": function(){
		$("#mapDiv").append(googleMap);
	}
}

bio.display();
work.display();
projects.display();
education.display();
map.display();