const Financa = require('../models/financas');
// put
exports.insertValues = async (req, res, next) =>{
    const id    =  req.body.idFin;
    const value =  req.body.value;
    const desc =  req.body.desc;
    await Financa.findOne({_id: id})
            .then(fin => {
                fin.values.push({value, desc});
                console.log(fin._id);
                fin.save();
                res.json({fin});
            })
            .catch( err => next(err))
}

//post
exports.inserFinanca = (req, res, next) => {
    console.log(req.body);
    const name = req.body.name;
    const valueGoal = req.body.valueGoal
    const desc = req.body.desc;
    const initialDate = req.body.initialDate;
    const deadline = req.body.deadline;
    const type = req.body.type;
    const initialValue = req.body.initialValue;

    const finObj = {
        name,
        desc,
        initialDate,
        deadline,
        type,
        valueGoal,
        initialValue
    }

    let financas =  new Financa(finObj);
    financas.save()
            .then((fin)=>{
                res.json(fin)
            })
            .catch(err => next(err));
}