import { Router } from "express";
import xss from 'xss';
import note from '../data/notes.js';
import { validateId, checkIsProperString } from "../helpers.js";
import application from '../data/applications.js';

const router = Router();

router.route("/notes/:noteid").delete(async(req, res) => {
    // check id
    let valId;
    try {
        valId = validateId(req.params.noteid);
    } catch(e) {
        return res.json({success:false, error:e.message});
    }

    // try deleting
    try {
        await note.removeNoteById(valId, req.session.user.userId);
    } catch(e) {
        return res.json({success:false, error:e.message});
    }

    // return success
    return res.json({success:true});
}).patch(async(req, res) => {
    // check id
    let valId;
    try {
        valId = validateId(req.params.noteid);
    } catch(e) {
        return res.json({success:false, error:e.message});
    }

    // check text body
    let cleanText;
    try {
        cleanText = checkIsProperString(req.body.text);
        cleanText = xss(cleanText);
    } catch(e) {
        return res.json({success:false, error:e.message});
    }

    // try updating
    let newNote;
    try {
        await note.updateNoteById(valId, cleanText, req.session.user.userId);
        newNote = await note.getNoteById(valId);
    } catch(e) {
        return res.json({success:false, error:e.message});
    }

    // return successful note
    return res.json({success:true, note:newNote});
});

router.route("/applications/notes/:appid").post(async (req, res) => {
    // check id
    let valId;
    try {
        valId = validateId(req.params.appid);
    } catch(e) {
        return res.json({success:false, error:e.message});
    }
    
    // check text body
    let cleanText;
    try {
        cleanText = checkIsProperString(req.body.text);
        cleanText = xss(cleanText);
    } catch(e) {
        return res.json({success:false, error:e.message});
    }

    // try updating
    let newNote;
    try {
        const noteResponse = await note.createNote(valId, cleanText);
        newNote = noteResponse.note;
    } catch(e) {
        return res.json({success:false, error:e.message});
    }

    // return successful note
    return res.json({success:true, note:newNote});
});

router.route("/applications/:appid").delete(async(req, res) => {
    // check id
    let appid;
    try {
        appid = validateId(req.params.appid);
    } catch(e) {
        return res.json({success:false, error:e.message});
    }

    console.log(req.session.user.userId);
    // try to delete 
    try {
        await application.removeJobapp(appid, req.session.user.userId);
        return res.json({success:true});
    } catch(e) {
        return res.json({success:false, error:e.message});
    }
});

export default router;
