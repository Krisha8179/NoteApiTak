const Notes = require('../models/Notes');
const User = require('../models/User');

function isStringInvalid(str){
    if(str == undefined || str.length === 0){
        return true
    }
    else{
        return false
    }
}


exports.addNote = async (req, res, next) => {
    try{
    
    const title = req.body.title;
    const content = req.body.content;
    

    if(isStringInvalid(title) || isStringInvalid(content)){
        return res.status(400).json({err: "some parameters missing"})
    }

    const data = await req.user.createNote({title: title,content: content})

    return res.status(201).json({message: "note added",notes: data});
    } catch(err){
        res.status(500).json({
            error: err
        })
    };
}


exports.getAllNotes = async (req,res)=> {

    try{
    const page = Number(req.query.page || 1);
    const ITEMS_PER_PAGE = Number(req.query.limit)
    console.log('page:',page,'limit:',ITEMS_PER_PAGE)
    const totalNotes = await Notes.count({where: {userId: req.user.id}});
    const notes = await Notes.findAll({where: {
        userId: req.user.id},
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
    });
    return res.status(200).json({
        allNotes: notes,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalNotes,
        nextPage: page + 1,
        hasPreviousPage: page > 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalNotes / ITEMS_PER_PAGE) 
    })
    } catch(err){
        console.log('error in getting notes', err);
        return res.status(500).json({error: err})
    }
}

exports.getNote = async (req, res) => {
    try{

        const noteid = req.params.noteid;
        const noteObj = await Notes.findByPk(noteid);

        if(noteObj){
            if(req.user.id !== noteObj.userId){
                res.status(401).json({message: 'you are not authorized'})
            }
            else{
                res.status(200).json({note: noteObj});
            }
        }
        else{
            res.status(404).json({message: 'not found'})
        }

    }catch(err) {
        console.log('error in getting note', err);
        return res.status(500).json({error: err})
    }
}

exports.updateNote = async (req, res) => {
    try{

        const title = req.body.title;
        const content = req.body.content;

        const noteid = req.params.noteid;
        const noteObj = await Notes.findByPk(noteid);

        if(noteObj){
            if(req.user.id !== noteObj.userId){
                res.status(401).json({message: 'you are not authorized'})
            }
            else{
                const data = await noteObj.update({title: title,content: content})
                res.status(200).json({message: "note updated",note: noteObj});
            }
        }else{
            res.status(404).json({message: 'not found'})
        }

    }catch(err) {
        console.log('error in updating note', err);
        return res.status(500).json({error: err})
    }
}


exports.deleteNote = async (req, res) => {
    try{

        const noteid = req.params.noteid;
        const noteObj = await Notes.findByPk(noteid);

        if(noteObj){
            if(req.user.id !== noteObj.userId){
                res.status(401).json({message: 'you are not authorized'})
            }
            else{
                await Notes.destroy({where:{id: noteid,userId: req.user.id}})
                res.status(200).json({message: "note deleted successfully"});
            }
        }else{
            res.status(404).json({message: 'not found'})
        }

    }catch(err) {
        console.log('error in deleting note', err);
        return res.status(500).json({error: err})
    }
}