const moment = require('moment');
const Report = require('../models/report');

const generateChart = async (userID) => {
    moment.locale('en');

    let stress = [];
    let nonStress = [];
    let lastSixMouth = new Date();
    lastSixMouth.setMonth(lastSixMouth.getMonth() - 6);

    const userData = await Report.find({
        userId: userID,
        createdAt: {$gte: lastSixMouth.toLocaleString()}
    });

    console.log(userData);

    const month = moment
        .months()
        .slice(new Date().getMonth() - 5, new Date().getMonth() + 1);

    for (let i = 5; i > -1; i--) {
        for (let x = 0; x < userData.length; x++) {
            if (
                new Date().getMonth() - i ===
                userData[x].createdAt.getMonth()
            ) {
                stress.push(userData[x].stress);
                nonStress.push(userData[x].nonStress);
            } else {
                stress.push(0);
                nonStress.push(0);
            }
        }
    }

    console.log(month);
    console.log(stress);
    console.log(nonStress);

    if (stress.length === 0 && nonStress.length === 0) {
        return null;
    }

    const lineChart = {
        type: 'line',
        data: {
            labels: month,
            datasets: [
                {
                    backgroundColor: 'rgba(255,150,150,0.5)',
                    borderColor: 'rgb(255,150,150)',
                    data: stress,
                    label: 'stress',
                    fill: 'origin'
                },
                {
                    backgroundColor: 'rgba(54,162,235,0.5)',
                    borderColor: 'rgb(54,162,235)',
                    data: nonStress,
                    label: 'non-stress',
                    fill: 'origin'
                }
            ]
        }
    };

    const url = `https://image-charts.com/chart.js/2.8.0?bkg=white&c=${JSON.stringify(
        lineChart
    )}`;

    return url;
};

module.exports = generateChart;
