import fs from 'node:fs';

const Question2 = () => {
  const timeStamp = Date.now();

  let jobData = {};
  let arrData;

  const prom = new Promise((resolve) => {
    fs.writeFile(`./${timeStamp}_response.json`, '', () => { resolve('File created Successfully.'); });
  });
  prom.then(() => new Promise((resolve, reject) => {
    fs.readFile('./jobs.json', 'utf8', (err, data) => {
      if (err) { reject(err); }
      resolve(JSON.parse(data));
    });
  })).then((data) => { jobData = { ...data }; }).then(() => new Promise((resolve, reject) => {
    fs.readFile('./technologies.json', 'utf8', (err, data) => {
      if (err) { reject(err); }
      resolve(data);
    });
  }))
    .then((data) => {
      // using pattern matching and adding it to set.
      const regex = /(")\w+(")/g;
      arrData = data.match(regex);
    })
    .then(() => {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in jobData) {
        const { description } = jobData[key];
        let tag = '';
        arrData.forEach((element) => {
          if (description.includes(element.slice(1, -1)) === true) {
            if (tag === '') {
              tag += element.slice(1, -1);
            } else {
              tag += ', ';
              tag += element.slice(1, -1);
            }
          }
        });
        jobData[key].tag = tag;
        jobData[key].timeStamp = Date.now();
      }
    })
    .then(() => {
      // perfrom write operation
      try {
        fs.writeFileSync(`./${timeStamp}_response.json`, JSON.stringify(jobData));
        // file written successfully
      } catch (err) {
        console.error(err);
      }
    });
};

export default Question2;
