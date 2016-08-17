var days, redrawDayPanel, redrawDayHeader;

$( document ).ready(function() {
    
    days = [];
    
    dayOne = new DayItinerary();
    
    days.push(dayOne);
    
    redrawDayPanel = function() {
        var day = getCurrentDay();
        //clear the panel and the markers
        $('.itinerary-item').empty();
        Object.keys(markers).forEach(name => markers[name].setMap(null));
        
        //set panel's values to day's values
        Object.keys(day.order).forEach(function(type) {
            day.order[type].forEach(function(name) {
              $('#'+type).append('<span class="title">'+name+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>');
        drawMarker(name, type, day[type][name].place.location);  
            })
        })   
    }
    
    redrawDayHeader = function() {
        //clear all buttons
        $('.day-buttons').empty();
        
        //redraw only what is represented in days
        days.forEach(function(day, idx){
            $('.day-buttons').append('<button id="day-'+(idx+1)+'" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)" class="btn btn-circle day-btn day-value">'+(idx+1)+'</button>');
        });
        
        //ending button
        $('.day-buttons').append('<button class="btn btn-circle day-btn" id="day-add">+</button>');
    }
    
    redrawDayHeader();
    
    var data = {hotel, restaurant, activity};
    
    var getCurrentDay = function(){
        var txt = $('#currentDay').text();
        var dayNum = +txt.split(' ')[1];
        return days[dayNum-1];
    }
    
    $('#options-panel').on('click', 'button', function(){
        var selectElement = $(this).siblings('select');
        var name = selectElement.val();
        var type = selectElement.data('type');
        var foundThing = data[type].filter(hotelObj=>(hotelObj.name === name))[0];
        
        //push this onto current dayItinerary
        getCurrentDay().add(type, foundThing);
        
        $('#'+type).append('<span class="title">'+name+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>');
        drawMarker(name, type, foundThing.place.location);
    });
    
    $('#itinerary').on('click', 'button', function() {
        var type = $(this).parent().attr('id');
        var name = $(this).prev().text();
        getCurrentDay().remove(type, name);
        $(this).prev().remove();
        $(this).remove();
        markers[name].setMap(null);
    });
    
    $('.day-buttons').on('click', '#day-add', function() {
        days.push(new DayItinerary());
        redrawDayHeader();
    });
    
    $('.day-buttons').on('click', '.day-value', function() {
        var dayNum = $(this).text();
        if($('#currentDay').text().includes(dayNum)){
            return;
        }
        $('#currentDay').text('Day '+ dayNum);
        redrawDayPanel();
    });
    
    
    
    $('.remove').on('click', function() {
        var txt = $('#currentDay').text();
        var dayNum = +txt.split(' ')[1];
        if(days.length > 1){
            days.splice(dayNum-1, 1);
        }
        else{
            days = [new DayItinerary()];
        }
        if(dayNum !== 1){
            $('#currentDay').text('Day '+ (dayNum-1));
            $('#day-'+dayNum).remove();
        }
        redrawDayHeader();
        redrawDayPanel();
    });
    
    
})