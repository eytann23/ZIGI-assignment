util = require("util");
const {
    extractTimestampsFromCalenders,
    sortAndMergeMeetingsArrays,
    mergeOverlapMeetings,
    getAvailableSlotsBetweenMeetings
} = require('./utils')

const sampleData = require('./db')


const findAvailableSlotsBetweenCalenders = (calenders) => {
    const timestampsData = extractTimestampsFromCalenders(calenders)
    // console.log(`timestampsData:\n ${util.inspect(timestampsData)}`)

    const sortedMeetingArrays = sortAndMergeMeetingsArrays(timestampsData)
    // console.log(`sortedMeetingArrays:\n ${util.inspect(sortedMeetingArrays)}`)

    const mergedMeetings = mergeOverlapMeetings(sortedMeetingArrays)
    // console.log(`mergedMeetings:\n ${util.inspect(mergedMeetings)}`)

    const availableSlots = getAvailableSlotsBetweenMeetings(mergedMeetings)
    // console.log(`availableSlots:\n ${util.inspect(availableSlots)}`)

    return availableSlots;
}

const availableSlots = findAvailableSlotsBetweenCalenders(sampleData)
console.log(availableSlots)