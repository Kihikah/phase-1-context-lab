// createEmployeeRecord
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // createEmployeeRecords
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }
  
  // createTimeInEvent
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
    return this;
  }
  
  // createTimeOutEvent
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
    return this;
  }
  
  // hoursWorkedOnDate
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    
    
    if (timeIn && timeOut) {
      return (timeOut.hour - timeIn.hour) / 100;  
    }
    return 0;
  }
  
  // wagesEarnedOnDate
  function wagesEarnedOnDate(date) {
    const hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
  }
  
  // allWagesFor
  function allWagesFor() {
    return this.timeInEvents.reduce((total, event) => {
      return total + wagesEarnedOnDate.call(this, event.date);
    }, 0);
  }
  
  // findEmployeeByFirstName
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
  }
  
  // calculatePayroll
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
      return total + allWagesFor.call(employee);
    }, 0);
  }
  
