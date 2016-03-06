//1:a && b && c && d
//2:a && (b && c || d && (e || f)) 
//3:a && b && (c && (d || e || f) || g && (h || i) || j && k)


var datas1=	
	[
	 [{id:0,name:"database",express:"",length:1,left:30000,type:"start"}],
	 [{id:1,name:"filter1",express:"a=1",length:1,left:25000,parentNode:'P0',type:"filter"}],
	 [{id:2,name:"filter2",express:"b=2",length:1,left:20000,parentNode:'P0',type:"filter"}],
	 [{id:3,name:"filter3",express:"c=3",length:1,left:15000,parentNode:'P0',type:"filter"}],
	 [{id:4,name:"filter4",express:"d=4",length:1,left:10000,parentNode:'P0',type:"filter"}],
	 [{id:5,name:"result",express:"",length:1,left:5000,type:"end"}]
	];



var datas2=	
	[
	 [{id:0,name:"database",express:"All Customers",length:3,left:300000,parentNode:'P0',type:"start"}],
	 [{id:1,name:"filter1",express:"Age>=30",length:3,left:200000,parentNode:'P0',type:"filter"}],
	 [{id:2,name:"filter2",express:"Gender=Male",length:1,left:150000,parentNode:'P1',type:"filter"},
	  {id:3,name:"filter3",express:"IsVip=true",length:2,left:180000,parentNode:'P1',type:"filter"}],
	 [{id:4,name:"filter4",express:"Arpu Level>1",length:1,left:100000,parentNode:'P0',type:"filter"},
		  {id:5,name:"filter5",express:"Region=Demark",length:1,left:90000,parentNode:'P3',type:"filter"},
		  {id:6,name:"filter6",express:"Device Type=Telephone",length:1,left:90000,parentNode:'P3',type:"filter"}],
	 [{id:5,name:"result",express:"Filter Results",length:3,left:280000,parentNode:'P0',type:"end"}]
	];

var datas3=	
	[
	 [{id:0,name:"database",express:"All Customers",length:6,left:30000,parentNode:'P0',type:"start"}],
	 [{id:1,name:"filter1",express:"a=1",length:6,left:30000,parentNode:'P0',type:"filter"}],
	 [{id:2,name:"filter2",express:"b=2",length:6,left:30000,parentNode:'P0',type:"filter"}],
	 [{id:3,name:"filter3",express:"c=3",length:3,left:30000,parentNode:'P2',type:"filter"},
	  {id:4,name:"filter3",express:"d=3",length:2,left:30000,parentNode:'P2',type:"filter"},
	  {id:5,name:"filter3",express:"e=3",length:1,left:30000,parentNode:'P2',type:"filter"}],
	 [{id:6,name:"filter4",express:"f=4",length:1,left:30000,parentNode:'P3',type:"filter"},
	  {id:7,name:"filter4",express:"g=4",length:1,left:30000,parentNode:'P3',type:"filter"},
	  {id:8,name:"filter4",express:"h=4",length:1,left:30000,parentNode:'P3',type:"filter"},
	  {id:9,name:"filter4",express:"i=4",length:1,left:30000,parentNode:'P4',type:"filter"},
	  {id:10,name:"filter4",express:"j=4",length:1,left:30000,parentNode:'P4',type:"filter"},
	  {id:11,name:"filter4",express:"k=4",length:1,left:30000,parentNode:'P0',type:"filter"}],
	  [{id:12,name:"result",express:"Filter Results",length:6,left:280000,parentNode:'P0',type:"end"}]
	];