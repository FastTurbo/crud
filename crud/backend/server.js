import express from 'express'
import mongodb from 'mongodb'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())
const dbUrl = 'mongodb://localhost:27017';


const validate = data => {
    let errors = {}
    if (data.title === '') errors.title = 'Can not be empty'
    if (data.cover === '') errors.cover = 'Can not be empty'

    const isValid = Object.keys(errors).length === 0

    return { errors, isValid }
}

mongodb.MongoClient.connect(dbUrl,{ useNewUrlParser:true },(err, client) => {
    if(err) throw err;
    
    const db = client.db('crud');
    app.get('/api/games', (req, res) => {
        db.collection('games').find({}).toArray((err, games) => {
            res.json({ games })
        })
    })
    .post('/api/games', (req, res) => {
        const { errors, isValid } = validate(req.body)
        if(isValid){
            const { title, cover } = req.body
            db.collection('games').insert({title, cover}, (err, result) => {
                if(err){
                    res.status(500).json({errors: 'Something went wrong!'})
                }else{
                    res.json({ game: result.ops[0] })
                }
            })
        }else{
            res.status(404).json({ errors })
        }

    })


    //错误请求处理
    app.use((req, res) => {
        res.status(404).json({
            errors:{
                global:'Still working on it,Please try again later than when we implement it.'
            }
        })
    })
})


app.listen(8080, () => console.log('Server is running on localhost:8080'))