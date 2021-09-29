const History = require('../models/history');
const Data = require('../models/data');
const Notification = require('../models/notification');
const NonStress = require('../models/nonStressWords');
const Stress = require('../models/stressWords');
const Average = require('../models/average');
const Report = require('../models/report');
const {getUserPersona} = require('./actionController');

const storeData = async (event, result) => {
    const {data} = await getUserPersona(event.sender.id);
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const latestDoc = await Average.find().sort({createdAt: -1}).limit(1);
    const latestMonthDoc = latestDoc[0].createdAt.getMonth() + 1;
    const latestYearDoc = latestDoc[0].createdAt.getFullYear();

    console.log(latestDoc);

    const oldUser = await Notification.findOne({userId: event.sender.id});
    if (!oldUser) {
        await Data.findOneAndUpdate({}, {$inc: {users: 1}});
        const result = await Report.create({
            userId: event.sender.id,
            stress: 0,
            nonStress: 0,
            cantTell: 0
        });
        await result.save();
    }

    const latestReport = await Report.find({userId: event.sender.id})
        .sort({createdAt: -1})
        .limit(1);

    for (const elem of result) {
        const history = await History.create({
            userId: event.sender.id,
            username: `${data.first_name} ${data.last_name}`,
            message: elem.text,
            labels: elem.labels,
            confidence: elem.confidence_score
        });

        await history.save();

        if (currentMonth !== latestMonthDoc || currentYear !== latestYearDoc) {
            let average;
            if (elem.labels === 'stress') {
                average = await Average.create({stress: 1});
            } else if (elem.labels === 'non-stress') {
                average = await Average.create({nonStress: 1});
            } else {
                average = await Average.create({cantTell: 1});
            }
            await average.save();
        } else {
            if (elem.labels === 'stress') {
                latestDoc[0].stress += 1;
                latestReport[0].stress += 1;
            } else if (elem.labels === 'non-stress') {
                latestDoc[0].nonStress += 1;
                latestReport[0].nonStress += 1;
            } else {
                latestDoc[0].cantTell += 1;
                latestReport[0].cantTell += 1;
            }
            await latestDoc[0].save();
            await latestReport[0].save();
        }

        if (elem.labels === 'stress') {
            await Data.findOneAndUpdate({}, {$inc: {messages: 1, stress: 1}});
            for (const word of elem.words) {
                const result = await Stress.findOneAndUpdate(
                    {text: word},
                    {$inc: {value: 1}}
                );
                if (!result) {
                    const newWord = await Stress.create({
                        text: word,
                        value: 1
                    });
                    await newWord.save();
                }
            }
        } else if (elem.labels === 'non-stress') {
            await Data.findOneAndUpdate(
                {},
                {$inc: {messages: 1, nonStress: 1}}
            );
            for (const word of elem.words) {
                const result = await NonStress.findOneAndUpdate(
                    {text: word},
                    {$inc: {value: 1}}
                );
                if (!result) {
                    const newWord = await NonStress.create({
                        text: word,
                        value: 1
                    });
                    await newWord.save();
                }
            }
        } else {
            await Data.findOneAndUpdate({}, {$inc: {messages: 1, cantTell: 1}});
        }
    }

    await Notification.findOneAndUpdate(
        {userId: event.sender.id},
        {$set: {lastActive: new Date()}},
        async function (error, result) {
            if (!error) {
                if (!result) {
                    const notification = await Notification.create({
                        userId: event.sender.id,
                        lastActive: new Date()
                    });

                    await notification.save();
                }
            }
        }
    );
};

module.exports = storeData;
