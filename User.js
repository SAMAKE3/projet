let db;
module.exports = (_db)=>{
    db = _db
    return User
}
let User =  class {
    static reservation(element){
        return new Promise((next)=>{
            db.query('INSERT INTO reservations (nom,contacts,heure,date) VALUES(?,?,?,?)',[element.name,element.phone,element.heure,element.date])
            .then((result)=>{
                if(result)
                {
                    next(result)
                }
                else
                {
                    next(new Error('il y a eu une erreur'))
                }
            })
            .catch((error)=>{
                next(error)
            })
        })
    }
}