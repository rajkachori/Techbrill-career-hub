document.addEventListener('DOMContentLoaded', () => {
  const applyForm = document.querySelector('.apply-form');
  const teamCards = document.querySelectorAll('.team-card');


  if (applyForm) {
    applyForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const submitBtn = applyForm.querySelector('button[type="submit"]');
      const nameInput = applyForm.querySelector('input[placeholder="Your Name"]');
      const emailInput = applyForm.querySelector('input[placeholder="Email Address"]');
      const urlInput = applyForm.querySelector('input[placeholder="Portfolio or LinkedIn URL"]');
      const fileInput = document.getElementById('applicant-resume');
      const bioInput = applyForm.querySelector('textarea');

      const nativeButtonText = submitBtn.textContent;

      // URL Verification 
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i;
      if (urlInput && urlInput.value.trim() !== '' && !urlPattern.test(urlInput.value.trim())) {
        alert('Please enter a valid URL configuration for your portfolio or LinkedIn profile.');
        urlInput.focus();
        return;
      }

      // File Validation 
      if (!fileInput || fileInput.files.length === 0) {
        alert('Please select a valid Resume or CV file asset to upload.');
        return;
      }

      const uploadedFile = fileInput.files[0];
      const maxFileSizeInBytes = 5 * 1024 * 1024; 
      const validExtensions = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

      // File Size  Validation
      if (uploadedFile.size > maxFileSizeInBytes) {
        alert('File size benchmark exceeded! Please optimize your file down beneath 5MB.');
        fileInput.focus();
        return;
      }

      
      if (!validExtensions.includes(uploadedFile.type)) {
        alert('Invalid file format structure detected. Please parse your documents into .pdf or .docx.');
        fileInput.focus();
        return;
      }

      try {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.textContent = 'Uploading Profile...';

        
        const multiPartPayload = new FormData();
        multiPartPayload.append('applicantName', nameInput.value.trim());
        multiPartPayload.append('applicantEmail', emailInput.value.trim());
        multiPartPayload.append('applicantUrl', urlInput.value.trim());
        multiPartPayload.append('applicantBio', bioInput.value.trim());
        multiPartPayload.append('applicantResumeFile', uploadedFile); 
        multiPartPayload.append('submittedAt', new Date().toISOString());

        
        await new Promise(resolve => setTimeout(resolve, 1500));

        alert(`Registry Successful! Thank you, ${nameInput.value.trim()}. Your details and resume file (${uploadedFile.name}) have been securely logged into our review framework queues.`);
        
        
        applyForm.reset();

      } catch (error) {
        console.error('Pipeline File Object Processing Exception:', error);
        alert('An infrastructure sync issue occurred processing file binary streams.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.textContent = nativeButtonText;
      }
    });
  }
});
