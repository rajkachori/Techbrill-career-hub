document.addEventListener('DOMContentLoaded', function() {
    
    const contactBtn = document.getElementById('contactBtn');
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactMessage = document.getElementById('contactMessage');

    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            let nameVal = contactName.value.trim();
            let emailVal = contactEmail.value.trim();
            let msgVal = contactMessage.value.trim();

            if (nameVal === '' || emailVal === '' || msgVal === '') {
                alert('Please fill out all fields before submitting.');
                return;
            }

            if (emailVal.indexOf('@') === -1 || emailVal.indexOf('.') === -1) {
                alert('Please check your email address and try again.');
                return;
            }

            alert('Thanks ' + nameVal + ', your message has been sent successfully!');
            
            contactName.value = '';
            contactEmail.value = '';
            contactMessage.value = '';
        });
    }

    const eventsGrid = document.getElementById('eventsGrid');
    
    if (eventsGrid) {
        const upcomingEvents = [
            { title: 'Tech Meetup 2026', date: 'Oct 15, 2026', loc: 'Main Campus' },
            { title: 'Code Hackathon', date: 'Nov 02, 2026', loc: 'Online' },
            { title: 'Winter Career Fair', date: 'Dec 10, 2026', loc: 'Technology Hub' }
        ];

        eventsGrid.innerHTML = '';
        
        for (let i = 0; i < upcomingEvents.length; i++) {
            let currentEvent = upcomingEvents[i];
            
            let cardWrap = document.createElement('div');
            cardWrap.className = 'card event-card';
            
            let head = '<h3>' + currentEvent.title + '</h3>';
            let dateInfo = '<p><strong>Date:</strong> ' + currentEvent.date + '</p>';
            let locInfo = '<p><strong>Location:</strong> ' + currentEvent.loc + '</p>';
            
            cardWrap.innerHTML = head + dateInfo + locInfo;
            eventsGrid.appendChild(cardWrap);
        }
    }
});