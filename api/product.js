module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validator

    const save = (req, res) => {
        const product = {...req.body}
        if(req.params.id) product.id = req.params.id

        try {
            existsOrError(product.name, 'Nome não informado')
            existsOrError(product.description, 'Descrição não informada')
            existsOrError(product.imageUrl, 'Imagem não definida')
            existsOrError(product.price, 'Preço não informado')
            existsOrError(product.content, 'Conteudo não informado')
        } catch (msg) {
            res.status(400).send(msg)
        }

        if(product.id) {
            app.db('products')
               .update(product)
               .where({ id: product.id })
               .then(_ => res.status(204).send())
               .catch(err => res.status(500).send(err))
        } else {
            app.db('products')
               .insert(product)
               .then(_ => res.status(204).send())
               .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('products')
                .where({id: req.params.id}).del()
            notExistsOrError(rowsDeleted, 'Produto não encontrado')
            
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }
    const limit = 10 // usado para paginação
    const get = async (req, res) => {

        const result = await app.db('products').count('id').first()
        const count = parseInt(result.count)

        app.db('products')
           .select('id', 'name', 'description','price')
           .then(products => res.json({ data: products, count, limit }))
           .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('products')
           .where({id: req.params.id})
           .first()
           .then(product => {
                product.content = product.content.toString()
                return res.json(product)
           })
           .catch(err => res.status(500).send(err))
    }
    return { save, remove, get, getById }
}