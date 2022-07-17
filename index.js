const cheerio = require("cheerio")
const axios = require("axios");

const { log } = console;
 
for(let pageNum = 0; pageNum < 1000; pageNum+=25){
    let url = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=email%2Bdeveloper&location=United%2BStates&geoId=103644278&trk=public_jobs_jobs-search-bar_search-submit&currentJobId=2931031787&position=1&pageNum=0&start=${pageNum}`

    axios(url)
    .then (response => {
        const html = response.data
        const $ = cheerio.load(html);
        const jobs = $("li");
        let linkedInJobs = [];
        
            jobs.each((index, element) => {
                let title = $(element).find("h3.base-search-card__title").text().trim(); 
                const company = $(element).find('h4.base-search-card__subtitle').text().trim();
                const location = $(element).find('span.job-search-card__location').text().trim();
                const link = $(element).find('a.base-card__full-link').attr('href');
    
                const jobs  = {
                    title,
                    company,
                    location,
                    link
                }
    
                linkedInJobs.push(jobs);         
        })

       log(linkedInJobs)
       
    }).catch(err => {
        console.log("ERROR : " + err.message);
    })
}


