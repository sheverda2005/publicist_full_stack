const {Router} = require('express')
const router = Router()
const Autorization = require('./autorizaton_schema')
const Post = require('./posts_schema')
const NEWS_DAY = require('./news_day_schema')
const IMPOTENT_POSTS = require('./impotent_posts_schema')

router.post("/verify", async (req, res)=> {
    const {id} = req.body
    const user = await Autorization.findOne({_id: id})
    if(user) {
        res.json({id: user._id, email: user.email, surName: user.surName, useName: user.useName})
    } else {
        res.status(400).json({eroor: 'Користувача не знайдено'})
    }

})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const responce = await Autorization.findOne({email, password})
    if (responce) {
        res.json({id: responce._id, email: responce.email, useName: responce.useName, surName: responce.surName})
    } else {
        res.status(400).json({error: 'Неправильний логін або пароль'})
    }
})

router.post('/register', async (req, res) => {
    const {email, password, useName, surName} = req.body
    const request = await Autorization.findOne({email})
    if (request) {
        res.status(400).json({error: 'Такий аккаунт уже існує'})
    } else {
        const create = new Autorization({email, password, useName, surName})
        const responce = await create.save()
        res.json({id: responce._id, email: responce.email, useName: responce.useName, surName: responce.surName})
    }
})

router.delete('/deleteAccount', async (req, res)=> {
    const {email} = req.body
    const request = await Autorization.deleteOne({email})
    res.json({error: "Аккаунт " + email + ' видалено'})
})

router.put('/putUser', async (req, res)=> {
    const {email, useName, surName} = req.body
    const request  = await Autorization.updateOne({email}, [{ $set: { useName: useName, surName: surName} }])
    if (request) {
        res.json({message: 'Аккаунт змінено'})    
    } else {
        res.status(400).json({error: 'Сталася невідома помилка'})
    }

})

router.post('/create_post', async (req, res)=> {
    const {title, text, img, impotent, autor, htmlPage} = req.body
    if (impotent === "USUALLY") {
        const post = new Post({title, text, img, impotent, autor, htmlPage})
        const response = await post.save()
        if(response) {
            res.json(response)
        } else {
            res.status(400).json({error: 'Пост не був сворений (помилка)'})
        }
    }
    if (impotent === "IMPOTENT_NEWS") {
        const post = new IMPOTENT_POSTS({title, text, img, impotent, autor, htmlPage})
        const response = await post.save()
        if(response) {
            res.json(response)
        } else {
            res.status(400).json({error: 'Пост не був сворений (помилка)'})
        }
    }
    if (impotent === "NEWS_DAY" ) {
        const post = new  NEWS_DAY({title, text, img, impotent, autor, htmlPage})
        const response = await post.save()
        if(response) {
            res.json(response)
        } else {
            res.status(400).json({error: 'Пост не був сворений (помилка)'})
        }
    }
})

router.get('/get_posts_usually', async (req, res)=> {
    const {page} = req.query
    const request = await Post.find().sort({$natural:-1}).skip((page*10) - 10).limit(10)
    const count = await Post.count()
    if (request.length > 0) {
        const posts = request.map(item => {
            return {id: item._id, title: item.title, text: item.text, img: item.img, htmlPage: item.htmlPage, impotent: item.impotent, useName: JSON.parse(item.autor).useName, surName: JSON.parse(item.autor).surName, email: JSON.parse(item.autor).email}
        })
        res.json({posts, count})
    }
})

router.get('/get_posts_impotent', async (req, res)=> {
    const {page} = req.query
    const request = await IMPOTENT_POSTS.find().sort({$natural:-1}).skip((page*10) - 10).limit(10)
    const count = await IMPOTENT_POSTS.count()
    if (request.length > 0) {
        const posts = request.map(item => {
            return {id: item._id, title: item.title, text: item.text, img: item.img, htmlPage: item.htmlPage, impotent: item.impotent, useName: JSON.parse(item.autor).useName, surName: JSON.parse(item.autor).surName, email: JSON.parse(item.autor).email}
        })
        res.json({posts, count})
    }
})

router.get('/get_posts_news_day', async (req, res)=> {
    const request = await NEWS_DAY.find().sort({$natural:-1}).limit(5)
    if (request.length > 0) {
        const posts = request.map(item => {
            return {id: item._id, title: item.title, text: item.text, img: item.img, htmlPage: item.htmlPage, impotent: item.impotent, useName: JSON.parse(item.autor).useName, surName: JSON.parse(item.autor).surName, email: JSON.parse(item.autor).email}
        })
        res.json({posts})
    }
})



router.delete('/delete_post', async (req, res)=> {
    const {id, impotent} = req.body
    if (impotent == 'USUALLY') {
       await Post.deleteOne({_id: id})
    }
    if (impotent == 'IMPOTENT_NEWS') {
        await IMPOTENT_POSTS.deleteOne({_id: id})
     }
    res.json({complete: 'success'})
})

module.exports = router;