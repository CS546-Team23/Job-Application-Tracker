import { users } from "../config/mongoCollections.js";
import { ObjectId, ReturnDocument } from "mongodb";
import {checkIsProperString, getCurrentTime, validateId, currDate, } from '../helpers.js';

const exportedMethods = {
async createNote(jobappId, notes){
    jobappId = validateId(jobappId);
    const date = currDate();
    notes = checkIsProperString(notes);

    const usersCollection = await users();
    const userWithApplication = await usersCollection.findOne({
        "applications._id": ObjectId.createFromHexString(jobappId),
    });
    if (!userWithApplication) {
        throw new Error(`Error: User not found with job application id: ${jobappId}`);
    }

    const applicationIndex = userWithApplication.applications.findIndex(application => application._id.toString() === jobappId);
    if (applicationIndex === -1) {
        throw new Error(`Error: Job application not found with id: ${jobappId}`);
    }
    const newNote = {
        _id: new ObjectId(),
        date: date,
        time: getCurrentTime(),
        text: notes
    };

    userWithApplication.applications[applicationIndex].Notes.push(newNote);
    const updatedUser = await usersCollection.findOneAndUpdate(
        { _id: userWithApplication._id },
        { $set: { applications: userWithApplication.applications } },
        { returnDocument: "after" }
    );

    return { user:updatedUser, note:newNote };
}, 

async getNoteById(noteId){
    noteId = validateId(noteId);
    const userCollection = await users();
    const userWithNote = await userCollection.findOne({
        "applications.Notes._id" : ObjectId.createFromHexString(noteId)
    });
    if (!userWithNote) {
        throw new Error(`Error: User not found with note id: ${noteId}`);
    }

    let foundNote = null;
    userWithNote.applications.forEach(application => {
        application.Notes.forEach(note => {
            if (note._id.toString() === noteId) {
                foundNote = note;
            }
        });
    });

    if (!foundNote) {
        throw new Error(`Error: Note not found with id: ${noteId}`);
    }

    return foundNote;
},

async removeNoteById(noteId){
    noteId = validateId(noteId);
    const usersCollection = await users();
    const userWithNote = await usersCollection.findOne({
        "applications.Notes._id": ObjectId.createFromHexString(noteId),
    });
    if (!userWithNote) {
        throw new Error(`Error: User not found with note id: ${noteId}`);
    }
    let foundNoteIndex = -1;
    userWithNote.applications.forEach((application, index) => {
        const noteIndex = application.Notes.findIndex(note => note._id.toString() === noteId);
        if (noteIndex !== -1) {
            foundNoteIndex = index;
        }
    });

    if (foundNoteIndex === -1) {
        throw new Error(`Error: Note not found with id: ${noteId}`);
    }

    userWithNote.applications[foundNoteIndex].Notes = userWithNote.applications[foundNoteIndex].Notes.filter(note => note._id.toString() !== noteId);

    const updatedUser = await usersCollection.findOneAndUpdate(
        { _id: userWithNote._id },
        { $set: { applications: userWithNote.applications } },
        { returnDocument: "after" }
    );

    return updatedUser;

},

async updateNoteById(noteId, updateNote){
    noteId = validateId(noteId);
    updateNote = checkIsProperString(updateNote, 'updated-note');
    const userCollection = await users();
    const userWithNote = await userCollection.findOne({
        "applications.Notes._id": ObjectId.createFromHexString(noteId)
    });

    if (!userWithNote) {
        throw new Error(`Error: User not found with note id: ${noteId}`);
    }

    let foundNote = null;
    let foundApplicationIndex = -1;
    let foundNoteIndex = -1;

    userWithNote.applications.some((application, appIndex) => {
        const noteIndex = application.Notes.findIndex(note => note._id.toString() === noteId);
        if (noteIndex !== -1) {
            foundApplicationIndex = appIndex;
            foundNoteIndex = noteIndex;
            foundNote = application.Notes[noteIndex];
            return true; // Exit loop once the note is found
        }
        return false;
    });

    if (!foundNote) {
        throw new Error(`Error: Note not found with id: ${noteId}`);
    }

    foundNote.text = updateNote;
    foundNote.date = currDate();
    foundNote.time = getCurrentTime();
    userWithNote.applications[foundApplicationIndex].Notes[foundNoteIndex] = foundNote;

    const updatedUser = await userCollection.findOneAndUpdate(
        { _id: userWithNote._id },
        { $set: { applications: userWithNote.applications } },
        { returnDocument: "after" }
    );

    return updatedUser;

}

}

export default exportedMethods;