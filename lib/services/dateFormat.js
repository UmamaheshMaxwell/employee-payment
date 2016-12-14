Date.prototype.monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

Date.prototype.getMonthName = function() {
    return this.monthNames[this.getMonth()];
};

function GetCurrentMonthDetails(){
	var date = new Date();
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

	return {
		firstDay: firstDay.getDate(),
		lastDay: lastDay.getDate()
	}
}

module.exports = {
	getMonthName : new Date().getMonthName(),
	GetCurrentMonthDetails : GetCurrentMonthDetails()
}