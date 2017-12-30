/**
 * Filters and matches randomly patients based on their Psychology and Disease
 * (or Symptoms).
 * @Author: Nhut Hai Huynh
 */

const { matchPath } = require('./bayeasianNetwork');

var PATTERN = '';
var THRESHOLD = 'b';
var MY_SYMPTOMS = [];

/**
 * Gets random patient.
 * @return {object} - matched patient.
 * @param {array} patients - List of the other patients after checking Psychology
 * and Disease.
 */
function getBestMatch(patients) {
    Math.seed = 6;
    Math.seededRandom = function(max, min) {
        max = max || 1;
        min = min || 0;

        Math.seed = (Math.seed * 9301 + 49297) % 233280;
        var rnd = Math.seed / 233280.0;

        return min + rnd * (max - min);
    }

    return patients[Math.floor(Math.random() * patients.length)];
}

/**
 * Pre-processes string before comparing.
 * @return {string} - processed string.
 * @param {string} str - raw string.
 */
function processString(str) {
    return str.trim().toLocaleLowerCase();
}

/**
 * Checks whether the psychological score satisfies threshold, which is the psychological
 * score of patient who seeks for his peer. Note that this function compares alphabet-order.
 * @return {boolean} - Is more positive.
 * @param {object} patient - Other patient.
 */
function checkPsy(patient) {
    return patient['psyScore'] > THRESHOLD;
}

/**
 * Checks whether their diseases are same.
 * @return {boolean} - Is the same disease.
 * @param {object} patient - Other patient.
 */
function checkDisease(patient) {
    return processString(patient['disease']) == processString(PATTERN);
}

/**
 * Checks whether their symptoms are similar using Bayeasian Network.
 * @return {boolean} - Is the similar symptoms.
 * @param {object} patient - Other patient.
 */
function checkDisease(patient) {
    var processedOtherSymptoms = patient['symptoms'].map(processString);
    var processedMySymptoms = MY_SYMPTOMS.map(processString);
    return matchPath(processedOtherSymptoms, processedMySymptoms);
}

/**
 * Filters the list according to psychological score.
 * @return {array} - filtered list.
 * @param {array} patients - List of the other patients.
 * @param {char} psyScore - The psychological score of patient who seek for his peer.
 */
function matchPsy(patients, psyScore) {
    if (psyScore !== undefined) {
        THRESHOLD = psyScore;
    }

    var filtered_patients = patients.filter(checkPsy);

    if (filtered_patients.length > 0) {
        patients = filtered_patients;
    }

    return patients;
}

/**
 * Filters the list according to the disease.
 * @return {array} - filtered list.
 * @param {array} patients - List of the other patients.
 * @param {string} disease - the disease that patient is contracted.
 */
function matchDisease(patients, disease) {
    if (disease !== undefined) {
        PATTERN = disease;
    }

    var filtered_patients = patients.filter(checkDisease);

    if (filtered_patients.length > 0) {
        patients = filtered_patients;
    }

    return patients;
}

/**
 * Filters the list according to the symptoms.
 * @return {array} - filtered list.
 * @param {array} patients - List of the other patients.
 * @param {array} symptoms - the symptoms.
 */
function matchSymptoms(patients, symptoms) {
    if (symptoms !== undefined) {
        MY_SYMPTOMS = symptoms;
    }

    var filtered_patients = patients.filter(checkSymptoms);

    if (filtered_patients.length > 0) {
        patients = filtered_patients;
    }

    return patients;
}

module.exports = {matchPsy, matchDisease, matchSymptoms};