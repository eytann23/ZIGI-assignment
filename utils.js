// Extracting timestamps and converting to date object
const extractTimestampsFromCalenders = (calendersData) => {
    const convertToDateObj = ({ startTime, endTime }) => ({
        startTime: new Date(startTime),
        endTime: new Date(endTime)
    })
    const dateTimestamps = calendersData
        .map(({ meetings }) => {
            return meetings.map(convertToDateObj)
        });
    return dateTimestamps;
}


// Sorting by startTime
const sortAndMergeMeetingsArrays = (meetingsArrays) => {
    if (!meetingsArrays.length) return [];
    const meetingSlotsArrays = [...meetingsArrays];
    let sortedMergedArray = [...meetingSlotsArrays.shift()];

    while (meetingSlotsArrays.length) {
        let currentArray = meetingSlotsArrays[0];
        let index = 0;

        while (currentArray.length) {
            if (sortedItemStartTimeIsBigger(sortedMergedArray[index], currentArray[0])) {
                let shiftedItem = currentArray.shift();
                sortedMergedArray.splice(index, 0, shiftedItem);
            }
            index++;

            if (!sortedMergedArray[index]) {
                sortedMergedArray = sortedMergedArray.concat([...currentArray]);
                currentArray = [];
            }
        }
        meetingSlotsArrays.splice(0, 1);
    }
    return sortedMergedArray;
}
const sortedItemStartTimeIsBigger = (sortedItemTimestamp, currentItemTimestamp) =>
    (sortedItemTimestamp.startTime > currentItemTimestamp.startTime)



const mergeOverlapMeetings = (sortedMeetingsObjects) => {
    let mergedMeetingArray = [];
    if (!sortedMeetingsObjects.length) return mergedMeetingArray;

    mergedMeetingArray.push(sortedMeetingsObjects.shift());

    sortedMeetingsObjects.forEach((meetingObject) => {
        let lastMergedMeetingSlot = mergedMeetingArray[mergedMeetingArray.length - 1]
        if (meetingObject.startTime <= lastMergedMeetingSlot.endTime)
            lastMergedMeetingSlot.endTime = getLatestEndTime(lastMergedMeetingSlot, meetingObject)
        else
            mergedMeetingArray.push(meetingObject)
    })

    return mergedMeetingArray;
}
const getLatestEndTime = (firstMeeting, secondMeeting) => {
    return (firstMeeting.endTime > secondMeeting.endTime ? firstMeeting.endTime : secondMeeting.endTime);
}


const getAvailableSlotsBetweenMeetings = (mergedMeetings) => {
    const availableSlots = [];
    if (!mergedMeetings.length) return availableSlots;

    let availableSlot = {};
    availableSlot.startTime = mergedMeetings.shift().endTime;

    mergedMeetings.forEach((meetingsSlot) => {
        availableSlot.endTime = meetingsSlot.startTime;
        availableSlots.push(availableSlot);
        availableSlot = {};
        availableSlot.startTime = meetingsSlot.endTime;
    })

    return availableSlots;
}

module.exports = {
    extractTimestampsFromCalenders,
    sortAndMergeMeetingsArrays,
    mergeOverlapMeetings,
    getAvailableSlotsBetweenMeetings
}