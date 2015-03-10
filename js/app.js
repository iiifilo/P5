var initialCats = [
	{
	clickCount : 0,
	name : "Tabby",
	imgSrc : "img/434164568_fea0ad4013_z.jpg"
	},
	{
	clickCount : 0,
	name : "Tiger",
	imgSrc : "img/1413379559_412a540d29_z.jpg"
	},
	{
	clickCount : 0,
	name : "Scaredy",
	imgSrc :  "img/9648464288_2516b35537_z.jpg"
}
]

var Cat =function(data){
	this.clickCount = ko.observable(data.clickCount);
	this.name = ko.observable(data.name);	
	this.imgSrc = ko.observable(data.imgSrc);
	this.chiese = ko.observableArray(data.chiese);

}


var ViewModel = function(){	
	var self = this;
	this.catList = ko.observableArray([]);

	initialCats.forEach(function(catItem){
		self.catList.push(new Cat(catItem) );
	});

	this.currentCat = ko.observable(this.catList()[0]);
		
	this.incrementCounter = function (){
		self.currentCat().clickCount(self.currentCat().clickCount() + 1);
	};
	this.setCat = function (clickedCat){
		self.currentCat(clickedCat)
	}

}
ko.applyBindings(new ViewModel())
