var meetingEvents = [];

function getMeetingDates(meetDate) {

    if(meetDate.getFullYear() < 2022) {
        var nextEvent = {'Date': new Date(meetDate.getTime()),
                              'Title': 'Workflow Meeting - 10AM PT (USA Pacific)',
                              'Link': 'https://zoom.us/my/cncfserverlesswg'};

        meetingEvents.push(nextEvent);

        meetDate.setDate(meetDate.getDate() + 14);
        return getMeetingDates(meetDate);
    } else {
        return meetingEvents;
    }
}
var element = document.getElementById('meetingCalendar');
meetingCalendar(element, getMeetingDates(new Date(2020, 6, 6)), {});
