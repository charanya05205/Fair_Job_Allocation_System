document.addEventListener('DOMContentLoaded', function() {
    // Sample data for jobs and workers
    const jobs = [
        { id: 1, name: "Website Design", skills: ["HTML", "CSS", "JavaScript"], compensation: 80000 },
        { id: 2, name: "Content Writing", skills: ["Writing", "SEO"], compensation: 60000 },
        { id: 3, name: "Data Analysis", skills: ["Python", "SQL"], compensation: 100000 }
    ];

    const workers = [
        { id: 1, name: "Akash", skills: ["HTML", "CSS", "JavaScript"], availabilityScore: 20 },
        { id: 2, name: "Minny", skills: ["Writing", "SEO"], availabilityScore: 30 },
        { id: 3, name: "Padma", skills: ["Python", "SQL"], availabilityScore: 25 },
        { id: 4, name: "Keshav", skills: ["Data Mining", "Python", "SQL"], availabilityScore: 15 }
    ];

    // Function to display jobs
    function displayJobs() {
        const jobList = document.getElementById('job-list');
        jobList.innerHTML = '';
        jobs.forEach(job => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${job.name}</span>
                <div class="skills">Skills Required: ${job.skills.join(', ')}</div>
                <span>Compensation: ${job.compensation}</span>
                <button onclick="allocateJob(${job.id})">Allocate</button>
            `;
            jobList.appendChild(li);
        });
    }

    // Function to display workers
    function displayWorkers() {
        const workerList = document.getElementById('worker-list');
        workerList.innerHTML = '';
        workers.forEach(worker => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${worker.name}</span>
                <div class="skills">Skills: ${worker.skills.join(', ')}</div>
                <span class="availability">Availability: ${worker.availabilityScore}</span>
            `;
            workerList.appendChild(li);
        });
    }

    // Function to allocate job
    function allocateJob(jobId) {
        const job = jobs.find(j => j.id === jobId);
        let bestWorker = null;
        let bestMatchScore = -1;

        workers.forEach(worker => {
            // Calculate skill match score
            const matchScore = worker.skills.filter(skill => job.skills.includes(skill)).length;

            // Select the worker with the highest match score and lowest availability score
            if (matchScore > bestMatchScore || (matchScore === bestMatchScore && worker.availabilityScore < (bestWorker ? bestWorker.availabilityScore : Infinity))) {
                bestMatchScore = matchScore;
                bestWorker = worker;
            }
        });

        if (bestWorker) {
            alert(`Job is allocated`); //Show that the worker is alllocated
            // Update availability score (just for simulation)
            bestWorker.availabilityScore += job.compensation * 0.1;
            displayWorkers(); // Refresh worker list
        } else {
            alert('No suitable worker found for this job.');
        }
    }

    // Initial display of jobs and workers
    displayJobs();
    displayWorkers();
});
