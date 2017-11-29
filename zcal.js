var fPart = "<div style='box-shadow: 3px 3px 2px "+bShadow+"; font-family: Verdana; text-shadow: 2px 2px #000; text-align: center; vertical-align: middle; padding: 2px 2px; margin-top: 0.2em; border: 1px solid #000; border-radius: 8px 8px 8px 8px; color: #FFFFFF;"
var bShadow ="#707070";
//CODE-----------------
on("chat:message", function (msg) {
    var msgTxt = msg.content;
    if (msg.type == "api" && msgTxt.indexOf('!day') !== -1) {
        var Day = fPart+" background-color:#0000ff;'>A New Day is here!</div>";
        sendChat('', "/direct " + Day);
        var calanderPC = findObjs({_type: 'character',name: 'zCalendar'})[0];
        //day lookup
        var Day = findObjs({name: "Day",_type: "attribute",_characterid: calanderPC.id}, {caseInsensitive: true})[0];
        var DayNum = parseInt(Day.get("current"));
        var mDayNum = parseInt(Day.get("max"));
        //month lookup
        var Month = findObjs({name: "Month",_type: "attribute",_characterid: calanderPC.id}, {caseInsensitive: true})[0];
        var MonthNum = parseInt(Month.get("current"));
        var mMonthNum = parseInt(Month.get("max"));
        //year lookup
        var Year = findObjs({name: "Year",_type: "attribute",_characterid: calanderPC.id}, {caseInsensitive: true})[0];
        var YearNum = parseInt(Year.get("current"));
        Day.set('current', DayNum + 1);
        if (DayNum > mDayNum) {
            Day.set('current', 1);
            Month.set('current', MonthNum + 1);
        }
        if (MonthNum > mMonthNum) {
            Month.set('current', 1);
            Year.set('current', YearNum + 1);
        }
        weath();
    }
    if (msg.type == "api" && msgTxt.indexOf('!weather') !== -1) {
        weath();
    }
    function weath() {
        //Get Date-----------------
        var croll = findObjs({_type: 'character',name: 'zCalendar'})[0];        
        var oMonth = findObjs({name: "Month",_type: "attribute",_characterid: croll.id}, {caseInsensitive: true})[0];
        var MonthNum = parseInt(oMonth.get("current"));
        var oDay = findObjs({name: "Day",_type: "attribute",_characterid: croll.id}, {caseInsensitive: true})[0];
        var oDay = parseInt(oDay.get("current"));
        var oYear = findObjs({name: "Year",_type: "attribute",_characterid: croll.id}, {caseInsensitive: true})[0];
        var oYearNum = parseInt(oYear.get("current"));
        //Lookup name-----------------
        MonthId.forEach(function (opts) {
            if (MonthNum == opts.Month) {
                var cRare = 5;
                var cSnow = 10;
                var cRain = 15;
                var cFog = 25;
                var cMagnetic = 30;
                var MonthName = opts.Name;
                var date = MonthName + ', ' + oDay + " " + oYearNum + ' PA';
                //---find temp
                var rN = Math.floor(Math.random() * 50) - 25;
                var tChange = rN;
                var TempBase = (opts.Base + rN);
                var TempBaseReal = (opts.Base + rN);
                if (TempBase <= 10) {
                    var TempBase = TempBase + "F (Exposer Warning!)";
                } else if (TempBase >= 90) {
                    var TempBase = TempBase + "F (Heat Warning!)";
                } else {
                    var TempBase = TempBase + "F ";
                }
                //----------
                var ranType = randomInteger(100);
                if (ranType < cRare) {
                    oType = "Rare";
                } else if (ranType < cSnow) {
                    oType = "Snow";
                } else if (ranType < cRain) {
                    oType = "Rain";
                } else if (ranType < cFog) {
                    oType = "Fog";
                } else if (ranType < cMagnetic) {
                    oType = "Magnetic";
                } else {
                    oType = "Calm";
                }
                //----------
                if (TempBaseReal <= 35 & oType == "Rain") oType = "Snow";
                if (TempBaseReal > 35 & oType == "Snow") oType = "Rain";
                //----------
                array_name = eval(oType);
                var oDesc = array_name[Math.floor(Math.random() * array_name.length)];
                if (oType == 'Fog') tColor = 'http:\\//img.photobucket.com/albums/v58/PixelMagic/Blog%20Images/fog_element.jpg';
                if (oType == 'Rain') tColor = 'http:\\//2.bp.blogspot.com/-FIM7eNMpYr8/Uj8oOwqQt8I/AAAAAAAAAUY/Un2z7gY4LMw/s320/pouring+rain.jpg';
                if (oType == 'Snow') tColor = 'http:\\//www.ruralramblings.com/wp-content/uploads/2011/01/southern-snowflakes_8766.jpg';
                if (oType == 'Magnetic') tColor = 'http:\\//media2.newsnet5.com//photo/2012/01/24/aurora_20120124151932_320_240_20120124153254_320_240.JPG';
                if (oType == 'Calm') tColor = 'http:\\//www.mrwallpaper.com/wallpapers/blue-sunny-sky-851x315.jpg';
                if (oType == 'Rare') tColor = 'https:\\//c2.staticflickr.com/2/1406/5128618911_e17c2474b5.jpg';
                var output1 = "<b>" + date;
                var output2 = '<b>Temp: ' + TempBase + '<br><u><i>DayType: ' + oType;
                //----------
                var top = "<div style='background-position:center; box-shadow: 3px 3px 2px "+bShadow+"; text-shadow: 2px 2px #000; font-family: Arial; font-size:18px; text-align: center; vertical-align: middle; padding: 0px 0px; margin-top: 0.2em; border: 1px solid #000; border-radius: 10px 10px 0px 0px; color: #FFFFFF; background-image: url("+tColor+");'>" + output1 + "</div>";
                var MainSay = "<div style='box-shadow: 3px 3px 2px "+bShadow+";  font-family:Arial; text-align: center; vertical-align: middle; padding: 1px; border-left: 1px solid #000; border-right: 1px solid #000; border-radius: 0px; background-color: #BFB8A8; color: #000;'>" + output2 + "</div>";
                var MainEven = "<div style='box-shadow: 3px 3px 2px "+bShadow+";  font-family: Arial; text-align: center; vertical-align: middle; padding: 1px; border-left: 1px solid #000; border-right: 1px solid #000; border-radius: 0px; background-color: #CEC7B6; color: #000;'>" + oDesc + "</div>";
                var End = "<div style='background-position:center; box-shadow: 3px 3px 2px "+bShadow+"; padding: 5px; border-left: 1px solid #000; border-right: 1px solid #000; border-radius: 0px 0px 10px 10px; border: 1px solid #000; background-image: url("+tColor+"); color: #000;'></div>";
                sendChat('', "/direct " + top + MainSay + MainEven + End);
            }
        });
    };
});
/*------------------
WEATHER STUFF
------------------*/
//---MONTH
var MonthId = [
    {Month: 1,Name: 'Hammer',Base: 10},
    {Month: 2,Name: 'Alturiak',Base: 20},
    {Month: 3,Name: 'Ches',Base: 40},
    {Month: 4,Name: 'Tarsakh',Base: 60},
    {Month: 5,Name: 'Mirtul',Base: 70},
    {Month: 6,Name: 'Kythorn',Base: 80},
    {Month: 7,Name: 'FLamerule',Base: 90},  
    {Month: 8,Name: 'Eleasis',Base: 80},  
    {Month: 9,Name: 'Eleint',Base: 60},  
    {Month: 10,Name: 'Marpenoth',Base: 30},  
    {Month: 11,Name: 'Uktar',Base: 20},  
    {Month: 12,Name: 'Nightal',Base: 10}  
];
//---FOG TYPES
var Fog = [
        "Light Fog: Visibility reduced to 1/2 mile",
        "Heavy Fog: Visibility reduced to 1/4 mile",
        "Dense Fog: Visibility reduced to 100 feet and anything over 10mph is wreckless travel, +15 to prowl"
];
//---RAIN TYPES
var Rain = [
        "Light Rain",
        "Heavy Rain: Travel is treacherous in the mud and slick conditions Hard to see road or paths. Land navigation at -15%",
        "Downpour: Sheets of rain cover any and everything, seeing out of windows or visors a problem. Land navigation at -20%",
        "ThunderStorm: Best to lay low, strong rain, lightning, and high gusts of winds common. Land navigation at -30%"
];
//---SNOW TYPES
var Snow = [
        "Light Snow: Tracking is at -25%",
        "Heavy Snow: Progress cut in 1/2 and following tracks impossible. Land navigation at -30%",
        "Blizzard: The combination of high winds, heavy snow (typically 3d4 feet), and bitter cold make blizzards deadly for all who are unprepared for them. Progress is slow at best visibility is a 100 feet. Land navigation at -50%",
        "Whiteout: Progress is slow and cautious visibility is a few feet. making Spot, Search, and Listen checks and all ranged weapon attacks impossible. Land navigation at -90%",
        "Small hail: pea sized balls of hail, Combat is -4 to hit due to you and your gun being pelted with the hail",
        "Large hail: Baseball sized hail falls, anyone not in armor or shelter takes 1d8 damage per 5 minutes exposed. Hearing or hitting anything outside arm reach is impossible due to the noise"
];
//---MAG TYPES
var Magnetic = [
        "Light Magnetic Storm: Radio range is 1/2, and electronic and mechanical compasses off by 1d20 degrees",
        "Heavy Magnetic Storm: Radio is useless, and electronic and mechanical compasses spin wildly"
];
//---CALM TYPES
var Calm = [
        "Very Light Winds, clear sky, its a beautiful day! Seems a great day for travel. Progress is at 110% and +10 to land navigation and tracking",
        "A nice clear day +10 to land navigation",
        "Very overcast, sun and sky hiding behind clouds. -10 to land navigation",
        "Overcast sky, light breezes, and overall pleasent conditions for the season",
        "A typical day like any other. Partially cloudy, calm winds.",
        "Clear skys, but higher than usual winds. prowling in bushes and wooded areas is easier +10 to prowl",
        "Clear skys, and dead calm winds. Prowling in quiet areas and wilderness is noticable, -10 to prowl"
];
//---RARE TYPES
var Rare = [
        "Incorporeal Wind: Incorporeal wind passes through physical objects and barriers, such as clothing, armor, walls, and solid earth and stone. It negates any benefit of winter clothing against cold and exposure effects, but also negates any penalty for heavy clothing or armor against heat. Incorporeal wind is blocked only by mage armor, wall of force, and similar force effects.",
        "Ghoststorm: A chill windstorm brings a cacophany of noises, including the lost voices of the dead. -8 penalty on Listen checks due to the howling of the wind. Ranged weapon attacks are impossible",
        "Celestial Clarity: The sky is a perfect azure blue, colors seem more vibrant, and details appear sharper. Celestial clarity grants a +4 bonus to Spot, Search, Listen, and Sense Motive checks.",
        "Rogue Zephyr: Rogue zephyrs are gentle but magical breezes which undo simple knots, locks, bolts, manacles, shackles, and similar impediments",
        "Undead fog: A fog comes, bringing with it the rising of any dead engulfed in the ground in its grasp. Some seek comfort, some want justice, others want revenge.",
        "Gale Force Winds: Winds over 70MPH tear around the landscape. Standing outside is near impossible. Small debris and rocks cause 1d10 damage for every minute outside."
];
