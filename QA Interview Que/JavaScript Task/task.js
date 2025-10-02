function generateRandomTestData() {
    const faker = require("faker"); // Ensure faker is installed (npm install faker)
    const moment = require('moment-timezone'); // Install it using: npm install moment-timezone
    // Define USA time zones
    const usaTimeZones = [
        'America/New_York',  // Eastern Time (ET)
        'America/Chicago',   // Central Time (CT)
        'America/Denver',    // Mountain Time (MT)
        'America/Los_Angeles' // Pacific Time (PT)
    ];
    // Pick a random USA time zone
    const randomTimeZone = faker.helpers.randomize(usaTimeZones);
    // Generate current time in the selected USA time zone
    const currentTimeUSA = moment().tz(randomTimeZone).format('hh:mm A z'); // e.g., 02:45 PM EST
    const dob = faker.date.past(30, new Date());
    const formattedDOB = `${String(dob.getMonth() + 1).padStart(2, '0')}/${String(dob.getDate()).padStart(2, '0')}/${dob.getFullYear()}`;
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: formattedDOB,
        sex: faker.helpers.randomize(["Male", "Female"]),
        mobileNumber: faker.phone.phoneNumber("+91##########"), // Indian number format
        email: `Yogi${faker.datatype.number(10000)}@${faker.internet.domainWord()}.com`,
        company: faker.helpers.randomize(["TCS", "Infosys"]),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        timeZone: currentTimeUSA,
    };
};
const testData = generateRandomTestData();
console.log(testData);
