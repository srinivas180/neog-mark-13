
function reverseString(str) {
    var chars = str.split('');
    var reverseList = chars.reverse();
    var result = reverseList.join('');
    return result;
}

function isPalindrome(str) {
    var reverseStr = reverseString(str);

    if(reverseStr === str) {
        return true;
    }
    return false;
}

function convertDateToStr(date) {
    var tempDateStr = {
        day: '',
        month: '',
        year: ''
    }

    if(date.day < 10) {
        tempDateStr.day = '0' + date.day;
    }
    else {
        tempDateStr.day = date.day.toString();
    }

    if(date.month < 10) {
        tempDateStr.month = '0' + date.month;
    }
    else {
        tempDateStr.month = date.month.toString();
    }

    tempDateStr.year = date.year.toString();
    return tempDateStr;
}



function getDateVariations(dateStr) {
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateVariations(dateStr) {
    var dateFormats = getDateVariations(dateStr);
    var palindromeDateformats = [];

    for(var i = 0; i < dateFormats.length; i++)
    {

        palindromeDateformats.push(isPalindrome(dateFormats[i]));
        if(palindromeDateformats[i] == true){
            isDatePalindrome = true;
        }
    }

    return palindromeDateformats;
}

function isLeapYear(year) {
    if (year % 4 == 0) {
        if (year % 100 == 0) {
          if (year % 400 == 0)
            leap = true;
          else
            leap = false;
        }
        else {
            leap = true;
        }
      }
      else {
        leap = false;
      }

      return leap;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //if month is february
    if(month === 2) {
        if(isLeapYear(year) && day > 29) {
            month = 3;
            day = 1;
        }
        else if(day > 28) {
            day = 1;
            month = 3;
        }
    }
    else if(day > daysInMonth[month - 1]) {
        day = 1;
        month++;
    }

    if(month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromicDate(date) {
    var nextDate = getNextDate(date);
    var daysCounter = 0;

    while(true) {
        daysCounter++;
        var nextDateStr = convertDateToStr(nextDate);
        var palindromeList = checkPalindromeForAllDateVariations(nextDateStr);

        for(var i = 0; i < palindromeList.length; i++) {

            if(palindromeList[i]) {
                return [daysCounter, nextDate];
            }
        }

        nextDate = getNextDate(nextDate);
    }
}

var dateInputHTML = document.querySelector("input[type='date']");
var output = document.querySelector(".output");
var btnCheck = document.querySelector(".btn-check");

function checkPalindromeDate() {
    var dateInput = dateInputHTML.value.split("-");
    
    var date = {
        day: Number(dateInput[2]),
        month: Number(dateInput[1]),
        year: Number(dateInput[0])
    }

    var dateStr = convertDateToStr(date);

    var isDatePalindrome = false;

    var datePalindromeList = checkPalindromeForAllDateVariations(dateStr);

    for(var i = 0; i < datePalindromeList.length; i++) {
        if(datePalindromeList[i]) {
            isDatePalindrome = true;
            break;
        }
    }

    // Find next palindrome date if current date is not palindrome
    if(!isDatePalindrome) {
        var [daysBetween, nextPalindromeDate] =  getNextPalindromicDate(date);
        console.log(daysBetween, nextPalindromeDate);
        output.innerHTML = "Your birthday is not palindrome, next palindrome date is " + nextPalindromeDate.day + "-" + nextPalindromeDate.month + "-" + nextPalindromeDate.year + " and you missed by " + daysBetween;
    }
    else {
        output.innerHTML = "Your birthday is palindrome";
    }
}

btnCheck.addEventListener("click", checkPalindromeDate);