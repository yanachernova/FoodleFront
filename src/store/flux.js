const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            path: 'http://localhost:5000',
            password: '',
            fullname: '',
            email: '',
            name: '',
            phone_number: '',
            address: '',
            delivery_price: '',
            consumerbusiness_id: '',
            count: 1,
            add: 0,
            totalAdd: 0,
            mode: 'view',
            paymentChoise: '',
            addressChoise: '',
            mapAddress: '',
            addressArr: [],
            selection: '',
            orderQty:'', //for save de length of business orders array in business login file
            interval:'', //for set the timeInterval in business login file
            responsePaypal: '',
            comment: '',
            ///////////////////////Consumers//////////////////////////////
            errorRegisterConsumer: '',
            errorLoginConsumer: '',
            isAuthenticatedConsumer: false,
            currentConsumer: {},
            ///////////////////////Businesses//////////////////////////////
            currentBusiness: {},
            idCurrentBusiness: '',
            idtest: '',
            nameCurrentBusiness: '',
            phoneNumberCurrentBusiness: '',
            deliveryPriceCurrentBusiness: '',
            addressCurrentBusiness: '',
            businessError: '',
            businesses: [],
            specBusiness: [],
            ///////////////////////BusinessesConsumer//////////////////////////////
            currentBusinessConsumer: {},
            errorRegisterBusinessConsumer: '',
            errorLoginBusinessConsumer: '',
            isAuthenticatedBusiness: false,
            BusinessConsumers: [],
            ///////////////////////Driver//////////////////////////////
            currentDriver: {},
            idCurrentDriver: '',
            errorLoginDriver: '',
            errorRegisterDriver: '',
            isAuthenticatedDriver: false,
            ///////////////////////Categories//////////////////////////////
            currentCategory: {},
            idtestforCategory: '',
            idcurrentCategory: {},
            nameCurrentCategory: '',
            errorChangingCategory: '',
            categories: [],
            specCategory: [],
            categoryError: '',
            isAuthenticatedCategory: '',
            ///////////////////////Products//////////////////////////////
            currentProduct: {},
            idcurrentProduct: '',
            idCategoryProductSelect: '',
            nameProducts: '',
            errorChangingProduct: '',
            products: [],
            specProducts: [],
            allProductsFromBusiness: [],
            price: '',
            description: '',
            not_available: false,
            productError: '',
            nameCurrentProduct: '',
            priceCurrentProduct: '',
            descriptionCurrentProduct: '',
            not_availableCurrentProduct: '',
            categoryProductId: '',
            selected: '',
            idSelected: '',
            nameCategoryProductBusinessLogin: '',
            idProductConsumer: '',
            thing_nameProductConsumer: '',
            priceProductConsumer: '',
            testProductOrder: {},
            ///////////////////////Order//////////////////////////////
            currentOrder: {},
            orders: [],
            ProdDet: [],
            total_price: '',
            orderError: '',
            ordersBusinessPanel:[],
            startOrder: '',
            clockOrder: '',
            timeLapse:'',
        },
        actions: {
            ///////////////////////GENERAL FUNCTIONS//////////////////////////////
            goHome: (history) => {
                history.push('/')
            },
            goCheckoutCash: (history) => {
                const store = getStore();
                if (store.paymentChoise === 'Cash' && store.addressChoise !== '') {
                    setStore({
                        paymentChoise: '' ,
                        addressChoise: '' 
                    })
                    history.push('/waiting')
                }else if (store.paymentChoise === 'Card' && store.addressChoise !== '') {
                    setStore({
                        paymentChoise: '' ,
                        addressChoise: ''
                    })
                    history.push('/waiting')
                }else{
                    alert('Choose youre payment method or address')
                }
                
            },
            pushLogout: (history) => {
                sessionStorage.removeItem('currentConsumer')
                setStore({
                    isAuthenticatedConsumer: false,
                    currentConsumer: {},
                })
                history.push('/')
            },
            normalLogout: () => {
                sessionStorage.removeItem('currentConsumer')
                setStore({
                    isAuthenticatedConsumer: false,
                    currentConsumer: {},
                })
            },
            Logout: (e) => {
                let id = document.getElementById(e.target.id)
                let sel = id.options[id.selectedIndex].text
                if (sel === "Logout") {
                    sessionStorage.removeItem('currentConsumer')
                    sessionStorage.removeItem('isAuthenticatedConsumer')
                    sessionStorage.removeItem('currentBusiness')
                    sessionStorage.removeItem('isAuthenticatedBusiness')
                    sessionStorage.removeItem('currentDriver')
                    sessionStorage.removeItem('isAuthenticatedDriver')
                    sessionStorage.removeItem('addressChoise')
                    sessionStorage.removeItem('paymentChoise')
                    sessionStorage.removeItem('responsePaypal')
                    setStore({
                        isAuthenticatedConsumer: false,
                        currentConsumer: {},
                        isAuthenticatedBusiness: false,
                        currentBusiness: {},
                        isAuthenticatedDriver: false,
                        currentDriver: {},
                        addressChoise: '',
                        paymentChoise: '',
                        responsePaypal: '',
                    })
                }else if(sel === "Get orders"){
                    setStore({
                        selection: "Get orders",
                    })
                
                }else {
                    setStore({
                        selection: "Business settings",
                    })  
                }
            },
            handleChange: e => {
                let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
                setStore({ [e.target.name]: value })
                if(e.target.name==='paymentChoise' || e.target.name==='addressChoise'){
                    sessionStorage.setItem([e.target.name], value)
                }
            },
            handleEdit: e => {
                const store = getStore();
                setStore({
                    mode: 'edit'
                })
                console.log(store.mode)
                console.log(store.currentConsumer.consumer.fullname)
            },
            cleanBusinessLogin: () => {
                setStore({
                    specCategory: [],
                })
            },
            /////////////////////REGISTER FUNCTIONS////////////////////////////
            registerConsumersPost: () => {
                const store = getStore();
                const data = {
                    fullname: store.fullname,
                    email: store.email,
                    password: store.password
                }
                fetch(store.path + '/register', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            setStore({ errorRegisterConsumer: data })
                        }
                        else {
                            setStore({
                                errorRegisterConsumer: '',
                                password: '',
                                fullname: '',
                                email: '',
                                currentConsumer: data,
                                isAuthenticatedConsumer: true,
                            })
                            sessionStorage.setItem('currentConsumer', JSON.stringify(data))
                            sessionStorage.setItem('isAuthenticatedConsumer', true)
                        }
                    })
            },
            registerFacebookConsumer: (fullname, email) => {
                const store = getStore();
                const data = {
                    fullname: fullname,
                    email: email,
                    password: 'facebookconsumer'
                }
                fetch(store.path + '/fbregister', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            setStore({ errorRegisterConsumer: data })
                        }
                        else {
                            setStore({
                                errorRegisterConsumer: '',
                                currentConsumer: data,
                                isAuthenticatedConsumer: true,
                            })
                            sessionStorage.setItem('currentConsumer', JSON.stringify(data))
                            sessionStorage.setItem('isAuthenticatedConsumer', true)
                            window.location.reload();
                        }
                    })
            },
            registerBusinessConsumerPost: () => {
                const store = getStore();
                const data = {
                    fullname: store.name,
                    email: store.email,
                    password: store.password
                }
                fetch(store.path + '/authconsumerbusinessregister', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            setStore({ errorRegisterBusinessConsumer: data })
                        }
                        else {
                            setStore({
                                errorRegisterBusinessConsumer: '',
                                password: '',
                                name: '',
                                email: '',
                            })
                        }
                    })
            },
            registerDriverPost: () => {
                const store = getStore();
                const data = {
                    fullname: store.fullname,
                    email: store.email,
                    password: store.password
                }
                fetch(store.path + '/registerdriver', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            setStore({ errorRegisterDriver: data })
                        }
                        else {
                            setStore({
                                errorRegisterDriver: '',
                                password: '',
                                name: '',
                                email: '',
                            })
                        }
                    })
            },
            ///////////////////////LOGIN FUNCTIONS//////////////////////////////
            loginConsumersPost: () => {
                const store = getStore();
                const data = {
                    email: store.email,
                    password: store.password
                }
                fetch(store.path + '/login', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.msg) {
                            setStore({ errorLoginConsumer: data })
                            console.log(getStore().errorLoginConsumer)
                        }
                        else {
                            setStore({
                                errorLoginConsumer: '',
                                password: '',
                                email: '',
                                currentConsumer: data,
                                isAuthenticatedConsumer: true,
                            })
                            console.log(data)
                            sessionStorage.setItem('currentConsumer', JSON.stringify(data))
                            sessionStorage.setItem('isAuthenticatedConsumer', true)
                        }
                    })
            },
            loginConsumersFacebook: (fullname, email) => {
                const store = getStore();
                const data = {
                    fullname: fullname,
                    email: email,
                    password: 'facebookconsumer'
                }
                fetch(store.path + '/fblogin', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.msg) {
                            setStore({ errorLoginConsumer: data })
                        }
                        else {
                            setStore({
                                errorLoginConsumer: '',
                                currentConsumer: data,
                                isAuthenticatedConsumer: true,
                            })
                            sessionStorage.setItem('currentConsumer', JSON.stringify(data))
                            sessionStorage.setItem('isAuthenticatedConsumer', true)
                            window.location.reload();
                        }
                    })
            },
            loginBusinessConsumerPost: () => {
                const store = getStore();
                const data = {
                    email: store.email,
                    password: store.password
                }
                fetch(store.path + '/authconsumerbusinesslogin', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.msg) {
                            setStore({ errorLoginBusinessConsumer: data })
                        }
                        else {
                            setStore({
                                errorLoginBusinessConsumer: '',
                                password: '',
                                email: '',
                                currentBusinessConsumer: data,
                                isAuthenticatedBusiness: true,
                            })
                            sessionStorage.setItem('currentBusinessConsumer', JSON.stringify(data))
                            sessionStorage.setItem('isAuthenticatedBusiness', true)
                            console.log(store.currentBusinessConsumer)
                            getActions().getSpecificBusinesses()
                        }

                    })
            },
            loginDriverPost: () => {
                const store = getStore();
                const data = {
                    email: store.email,
                    password: store.password
                }
                fetch(store.path + '/logindriver', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            setStore({ errorLoginDriver: data })
                        }
                        else {
                            setStore({
                                errorLoginDriver: '',
                                password: '',
                                email: '',
                                currentDriver: data,
                                isAuthenticatedDriver: true,

                            })
                            sessionStorage.setItem('currentDriver', JSON.stringify(data))
                            sessionStorage.setItem('isAuthenticatedDriver', true)
                        }
                    })
            },
            isAuthenticatedConsumer: () => {
                if (sessionStorage.getItem('currentConsumer') && sessionStorage.getItem('isAuthenticatedConsumer')) {
                    setStore({
                        isAuthenticatedConsumer: sessionStorage.getItem('isAuthenticatedConsumer'),
                        currentConsumer: JSON.parse(sessionStorage.getItem('currentConsumer')),
                    })
                }
            },
            isAuthenticatedCategory: () => {
                if (sessionStorage.getItem('idtest')) {
                    setStore({
                        idtest: JSON.parse(sessionStorage.getItem('idtest')),
                    })
                }
            },
            isAuthenticatedBusiness: () => {
                if (sessionStorage.getItem('currentBusinessConsumer') && sessionStorage.getItem('isAuthenticatedBusiness')) {
                    setStore({
                        isAuthenticatedBusiness: sessionStorage.getItem('isAuthenticatedBusiness'),
                        currentBusinessConsumer: JSON.parse(sessionStorage.getItem('currentBusinessConsumer')),
                    })
                }
            },
            isAuthenticatedDriver: () => {
                if (sessionStorage.getItem('currentDriver') && sessionStorage.getItem('isAuthenticatedDriver')) {
                    setStore({
                        isAuthenticatedDriver: sessionStorage.getItem('isAuthenticatedDriver'),
                        currentDriver: JSON.parse(sessionStorage.getItem('currentDriver')),
                    })
                }
            },
           
            isAuthenticatedConsumerBusiness: () => {
                if (sessionStorage.getItem('specBusiness') && sessionStorage.getItem('specCategory')) {
                    setStore({
                        specBusiness: JSON.parse(sessionStorage.getItem('specBusiness')),
                        specCategory: JSON.parse(sessionStorage.getItem('specCategory')),
                    })
                }
            }, 
            isAuthenticatedOrder: () => {
              if (sessionStorage.getItem('startOrder')) {
                  setStore({
                    startOrder: sessionStorage.getItem('startOrder')
                  })
              }
            },        
            //////////////////////////CONSUMER FUNCTIONS//////////////////////////////    
            putConsumerInformation: () => {
                const store = getStore();
                const data = {
                    fullname: store.fullname === '' ? store.currentConsumer.consumer.fullname : store.fullname,
                    phone_number: store.phone_number === '' ? store.currentConsumer.consumer.phone_number : store.phone_number,
                    address: store.address === '' ? store.currentConsumer.consumer.address : store.address,
                }
                fetch(store.path + '/consumers/' + store.currentConsumer.consumer.id, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentConsumer.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        /* console.log(data) */
                        if (data.msg) {
                            setStore({ errorRegisterConsumer: data })
                        }
                        else {
                            setStore({
                                errorRegisterConsumer: '',
                                /* fullname: '',
                                phone_number: '',
                                address: '', */
                                mode: 'view',
                            })
                            getActions().getSpecificConsumer()
                        }
                    })
            },
            deleteAddressMap:(address) => {
                const store = getStore();
                    //delete store.newArray(address) 
                    let newArray = [] 
                    newArray = store.currentConsumer.consumer.address.slice()
                    newArray.splice(newArray.indexOf(address),1) 
                    //splice(i,1)
                    getActions().putConsumerAddress(newArray) 
            },
            postAddressMap:(address)=>{
                const store = getStore();
                    setStore({
                        mapAddress: address
                    })
                    let newArray = []
                    if(store.currentConsumer.consumer.address) {
                        newArray = store.currentConsumer.consumer.address.slice()
                    }
                    newArray.push(address)      
                    getActions().putConsumerAddress(newArray) 
            },
            putConsumerAddress: (newArray) => {
                const store = getStore();
                const data = {
                    address: newArray,
                }
                fetch(store.path + '/consumers/' + store.currentConsumer.consumer.id, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentConsumer.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        /* console.log(data) */
                        if (data.msg) {
                            setStore({ errorRegisterConsumer: data })
                        }
                        else {
                            setStore({
                                errorRegisterConsumer: '',
                            })
                        }
                    })
                    getActions().getSpecificConsumer()
            },
            getSpecificConsumer: () => {
                const store = getStore();
                fetch(store.path + '/consumers/' + store.currentConsumer.consumer.id, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentConsumer.access_token
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        Object.assign(store.currentConsumer.consumer, data);
                        sessionStorage.setItem('currentConsumer', JSON.stringify(store.currentConsumer))
                        sessionStorage.setItem('isAuthenticatedConsumer', true)
                        getActions().isAuthenticatedConsumer()
                    })
            },
            isAuthCons: () => {
                setStore({
                    currentConsumer: JSON.parse(sessionStorage.getItem('currentConsumer'))
                })
            },
            goCheckout: (history) => {
                history.push('/checkout')
            },
            ///////////////////////BUSINESS FUNCTIONS//////////////////////////////
            POSTCreateNewBusiness: (mapAddress) => {
                const store = getStore();
                const data = {
                    name: store.name,
                    address: mapAddress,
                    phone_number: store.phone_number,
                    delivery_price: store.delivery_price,
                    consumerbusiness_id: store.currentBusinessConsumer.consumerbusiness.id
                }
                fetch(store.path + '/negocios', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentBusinessConsumer.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            setStore({ businessError: data })
                        }
                        else {
                            setStore({
                                businessError: '',
                                name: '',
                                consumerbusiness_id: '',
                            })
                            getActions().getSpecificBusinesses()
                        }
                    })
            },
            getBusinessData: (id, name, phone, delivery, address) => {
                const store = getStore();
                setStore({
                    idcurrentBusiness: id,
                    nameCurrentBusiness: name,
                    phoneNumberCurrentBusiness: phone,
                    addressCurrentBusiness: address,
                    deliveryPriceCurrentBusiness: delivery
                })
                console.log(store.idCurrentBusiness)
                console.log(store.nameCurrentBusiness)
                console.log(store.phoneNumberCurrentBusiness)
                console.log(store.addressCurrentBusiness)
                console.log(store.deliveryPriceCurrentBusiness)
            },
            getBusinessId: (id, delivery_price) => {
                const store = getStore();
                setStore({
                    idtest: id,
                    allProductsFromBusiness: [],
                    delivery_price: delivery_price
                })
                console.log(id)
                console.log(store.idtest)
                sessionStorage.setItem('idtest', id)
                sessionStorage.setItem('delivery_price', delivery_price)
            },
            getAllBusiness: () => {
                const store = getStore();
                fetch(store.path + '/businessesall', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setStore({
                            businesses: data
                        })
                        console.log(store.businesses)
                    })
            },
            putBusinessName: () => {
                const store = getStore();
                const data = {
                    name: store.name === '' ? store.nameCurrentBusiness : store.name,
                    phone_number: store.phone_number === '' ? store.phoneNumberCurrentBusiness : store.phone_number,
                    address: store.address === '' ? store.addressCurrentBusiness : store.address,
                    delivery_price: store.delivery_price === '' ? store.deliveryPriceCurrentBusiness : store.delivery_price
                }
                fetch(store.path + '/negocios/' + store.idcurrentBusiness, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentBusinessConsumer.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            setStore({ BusinessError: data })
                        }
                        else {
                            setStore({
                                BusinessError: '',
                                name: '',
                                phone_number: '',
                                address: '',
                                delivery_price: '',

                            })
                            getActions().getSpecificBusinesses()
                        }
                    })
            },
            getSpecificBusinesses: () => {
                const store = getStore();
                fetch(store.path + '/negocios/consumerbusiness/' + store.currentBusinessConsumer.consumerbusiness.id, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentBusinessConsumer.access_token
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setStore({
                            specBusiness: data,
                        })
                        if (store.specBusiness.length > 0) {
                            getActions().getSpecificCategory()
                            getActions().getOrderByNegocioId()
                            
                        }
                    })
                    sessionStorage.setItem('specBusiness', JSON.stringify(store.specBusiness))
                },
            ///////////////////////CATEGORY FUNCTIONS//////////////////////////////
            POSTCreateNewCategory: () => {
                const store = getStore();
                const data = {
                    name: store.name,
                    negocio_id: store.specBusiness[0].id
                }
                fetch(store.path + '/categories', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentBusinessConsumer.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            setStore({ categoryError: data })
                        }
                        else {
                            setStore({
                                categoryError: '',
                                name: '',
                            })
                            getActions().getSpecificCategory()
                        }
                    })
            },
            //Using in business Login for get the categories from the specific business
            getSpecificCategory: () => {
                const store = getStore();
                fetch(store.path + '/categories/negocio/' + store.specBusiness[0].id, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentBusinessConsumer.access_token
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setStore({
                            specCategory: data
                        })
                        sessionStorage.setItem('specCategory', JSON.stringify(store.specCategory))
                    })
            },
            getCategoryByBusinessId: () => {
                const store = getStore();
                fetch(store.path + '/categoriesnoauth/negocios/' + store.idtest, { //idtest business id
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setStore({
                            categories: data,
                            allProductsFromBusiness: []
                        })
                        if (sessionStorage.getItem('selected') === 'Categories') {
                            getActions().getallProductsfromBusiness()
                        }
                        else {
                            getActions().isCategoryforConsumerBusinessPage()
                        }
                    })
            },
            putCategoryName: () => {
                const store = getStore();
                const data = {
                    name: store.name === '' ? store.nameCurrentCategory : store.name
                }
                fetch(store.path + '/categories/' + store.idcurrentCategory, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentBusinessConsumer.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            setStore({ categoryError: data })
                        }
                        else {
                            setStore({
                                categoryError: '',
                                name: '',
                            })
                            getActions().getSpecificCategory()
                        }
                    })
            },
            getCategoryId: (id) => {
                const store = getStore();
                setStore({
                    idcurrentCategory: id,
                })
                console.log(store.idcurrentCategory)

            },
            deleteBusinessCategories: (id) => {
                const store = getStore();
                fetch(store.path + '/categories/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentBusinessConsumer.access_token
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        getActions().getSpecificCategory()
                    })
            },
            ///////////////////////PRODUCT FUNCTIONS//////////////////////////////
            //Using in BusinessLogin
            POSTCreateNewProduct: () => {
                const store = getStore();
                console.log(store.idCategoryProductSelect)
                const data = {
                    thing_name: store.name,
                    price: store.price,
                    description: store.description,
                    not_available: store.not_available,
                    category_id: store.idCategoryProductSelect //Dropdown
                }
                fetch(store.path + '/products', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentBusinessConsumer.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            setStore({ productError: data })
                        }
                        else {
                            setStore({
                                categoryError: '',
                                name: '',
                                price: '',
                                description: '',
                                not_available: ''
                            })
                            getActions().getSpecificProduct()
                        }
                    })
            },
            //Using in BusinessLogin
            getSpecificProduct: () => {
                const store = getStore();
                fetch(store.path + '/products/category/' + store.idCategoryProductSelect, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentBusinessConsumer.access_token
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setStore({
                            specProducts: data,
                        })
                    })
            },
            //Using in BusinessLogin
            putProductData: () => {
                const store = getStore();
                const data = {
                    thing_name: store.name === '' ? store.nameCurrentProduct : store.name,
                    price: store.price === '' ? store.priceCurrentProduct : store.price,
                    description: store.description === '' ? store.descriptionCurrentProduct : store.description,
                    not_available: store.not_available === '' ? store.not_availableCurrentProduct : store.not_available
                }
                fetch(store.path + '/products/' + store.idcurrentProduct, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentBusinessConsumer.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            setStore({ productError: data })
                        }
                        else {
                            setStore({
                                categoryError: '',
                                name: '',
                                price: '',
                                description: '',
                                not_available: '',
                            })
                            getActions().getSpecificProduct()
                        }
                    })
            },
            //Using in BusinessLogin for put product
            getProductId: (id, name, price, not_available, description) => {
                const store = getStore();
                setStore({
                    idcurrentProduct: id,
                    nameCurrentProduct: name,
                    priceCurrentProduct: price,
                    not_availableCurrentProduct: not_available,
                    descriptionCurrentProduct: description
                })
                console.log(store.idcurrentProduct)
            },
            //Using in BusinessLogin
            deleteBusinessProducts: (id) => {
                const store = getStore();
                fetch(store.path + '/products/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentBusinessConsumer.access_token
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        getActions().getSpecificProduct()
                    })
            },
            //Using in ConsumerProducts
            getProductByCategoryId: (sel) => {
                const store = getStore();
                fetch(store.path + '/noauthproducts/categories/' + sel, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setStore({
                            products: data,
                        })
                    })
            },
            getallProductsfromBusiness: () => {
                const store = getStore();
                store.categories.map((item) => {
                    fetch(store.path + '/noauthproducts/categories/' + item.id, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            data.map((item) => {
                                store.allProductsFromBusiness.push(item)
                                return null
                            })
                            setStore({
                                products: store.allProductsFromBusiness,
                            })

                        })
                    return null
                })
            },
            //Using in ConsumerProducts for select a category
            selectCategoriesForFilterProducts: (e) => {
                const store = getStore();
                let id = document.getElementById(e.target.id)
                let sel = id.options[id.selectedIndex].id
                let selected = id.options[id.selectedIndex].value
                setStore({
                    idtestforCategory: sel,
                    selected: selected,
                    idSelected: e.target.id,
                })
                if (selected === 'Categories') {
                    getActions().getallProductsfromBusiness()
                }
                else {
                    getActions().getProductByCategoryId(sel)
                    setStore({
                        allProductsFromBusiness: []
                    })
                }
                sessionStorage.setItem('idtestforCategory', store.idtestforCategory)
                sessionStorage.setItem('selected', selected)
                sessionStorage.setItem('idSelected', e.target.id)
                sessionStorage.setItem('allProductsFromBusiness', JSON.stringify(store.allProductsFromBusiness))
            },
            //Like a isAuthenticated for categories
            isCategoryforConsumerBusinessPage: () => {
                const store = getStore();
                if (sessionStorage.getItem('selected') && sessionStorage.getItem('idSelected') && sessionStorage.getItem('idtestforCategory')) {
                    setStore({
                        selected: (sessionStorage.getItem('selected')),
                        idSelected: (sessionStorage.getItem('idSelected')),
                        idtestforCategory: (sessionStorage.getItem('idtestforCategory')),
                    })
                    let selectid = document.getElementById(store.idSelected)
                    selectid.value = store.selected
                    console.log(selectid.value)
                    getActions().getProductByCategoryId(store.idtestforCategory)
                }
            },
            //Using in BusinessLogin for select a category
            selectCategoriesForFilterProductsinBusinessLogin: (e) => {
                let id = document.getElementById(e.target.id)
                let sel = id.options[id.selectedIndex].id
                let text = id.options[id.selectedIndex].text
                setStore({
                    idCategoryProductSelect: sel,
                    nameCategoryProductBusinessLogin: text
                })
                getActions().getSpecificProduct()
            },
            ///////////////////////ORDER FUNCTIONS//////////////////////////////
            totalPriceToPay: () => {
                const store = getStore();
                let adding = store.add + store.delivery_price
                setStore({
                    totalAdd: adding
                })
                console.log(store.totalAdd)
                sessionStorage.setItem('totalAdd', store.totalAdd)
            },
            totalPrice: () => {
                const store = getStore();
                let ad = 0;
                for (let x = 0; x < store.ProdDet.length; x++) {
                    ad = (store.ProdDet[x].price * store.ProdDet[x].quantity) + ad
                }
                setStore({
                    add: ad
                })
                sessionStorage.setItem('add', JSON.stringify(store.add))
            },
            Addcounter: (product) => {
                const store = getStore();
                console.log(product)
                let pro = product
                setStore({ count: product.quantity + 1 })
                let qty = { quantity: store.count }
                Object.assign(pro, qty);
                sessionStorage.setItem('ProdDet', JSON.stringify(store.ProdDet))
                getActions().totalPrice()
                getActions().totalPriceToPay()
            },
            Descreasingcounter: (product, i) => {
                const store = getStore();
                console.log(product)
                let pro = product
                if (product.quantity === 1) {
                    if (window.confirm('Delete product from chart? Press OK to confirm')) {
                        store.ProdDet.splice(i, 1)
                        sessionStorage.setItem('ProdDet', JSON.stringify(store.ProdDet))
                        getActions().isOrderAdd()
                        getActions().totalPrice()
                        getActions().totalPriceToPay()
                    }
                }
                else {
                    setStore({ count: product.quantity - 1 })
                    let qty = { quantity: store.count }
                    Object.assign(pro, qty);
                    sessionStorage.setItem('ProdDet', JSON.stringify(store.ProdDet))
                    getActions().isOrderAdd()
                    getActions().totalPrice()
                    getActions().totalPriceToPay()
                }
            },
            isOrderAdd: () => {
                if (sessionStorage.getItem('ProdDet')) {
                    setStore({
                        ProdDet: JSON.parse(sessionStorage.getItem('ProdDet')),
                        add: JSON.parse(sessionStorage.getItem('add')),
                        delivery_price: JSON.parse(sessionStorage.getItem('delivery_price')),
                        totalAdd: sessionStorage.getItem('totalAdd'),
                    })
                }
            },
            //Add a product in the order list, is using in Consumer Products
            PostAddToChart: (product) => {
                const store = getStore();
                let c = 0;
                for (let x = 0; x < store.ProdDet.length; x++) {
                    if (store.ProdDet[x].id === product.id) { c = c + 1 }
                }
                if (c === 0) {
                    store.ProdDet.push(product)
                    sessionStorage.setItem('ProdDet', JSON.stringify(store.ProdDet))
                    getActions().isOrderAdd()
                    getActions().totalPrice()
                    getActions().totalPriceToPay()
                }
            },
            /*       getOrder: () => {
                const store = getStore();
                fetch(store.path + '/orders', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentConsumer.access_token
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setStore({
                            orders: data
                        })
                    })
            }, */

            getOrderByNegocioId: () => {
                const store = getStore();
                fetch(store.path + '/orders/negocio/'+ store.specBusiness[0].id, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentBusinessConsumer.access_token
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setStore({
                            ordersBusinessPanel: data,
                            orderQty: data.length,
                        })
                        getActions().updateBusinessOrders()            
                    })
            },
            getOrderByNegocioId2: () => {
                const store = getStore();
                fetch(store.path + '/orders/negocio/'+ store.specBusiness[0].id, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentBusinessConsumer.access_token
                    }
                })
                    .then(response => response.json())
                    .then(data => {setStore({ordersBusinessPanel: data})})
            },
            POSTCreateNewOrder: (history) => {
                const today = new Date()   
                const store = getStore();
                const data = {
                    price: store.totalAdd,
                    product_details: store.ProdDet,
                    consumer_id: store.currentConsumer.consumer.id,
                    negocio_id: store.idtest,
                    comment: store.comment,
                    times: today.getHours()+':'+today.getMinutes()
                }
                fetch(store.path + '/orders', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentConsumer.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            setStore({ 
                                orderError: data
                             })
                        }
                        else {
                            sessionStorage.removeItem('addressChoise')
                            sessionStorage.removeItem('paymentChoise')
                            sessionStorage.removeItem('responsePaypal')
                            setStore({
                                orderQty: store.ordersBusinessPanel.length,
                                orderError: '',
                                currentOrder: data,
                                responsePaypal: '',
                                comment: '',
                            })
                            getActions().goCheckoutCash(history)

                        }
                    })
            },
            deleteOrderById: (id) => {
                const store = getStore();
                fetch(store.path + '/orders/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentBusinessConsumer.access_token
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        if(data.msg){
                            setStore({orderError: data.msg})
                        }
                        else{
                            setStore({orderError: ''})
                            getActions().getOrderByNegocioId()
                        }
                        
                    })
            },

            updateBusinessOrders:()=>{
                const store = getStore();
                setInterval(function(){
                    if(store.ordersBusinessPanel.length===store.orderQty){
                        getActions().getOrderByNegocioId2()
                        console.log('equal')
                        
                    }else if(store.ordersBusinessPanel.length<store.orderQty){
                        getActions().getOrderByNegocioId2()
                        alert('order deleted')
                        setStore({
                            orderQty: store.ordersBusinessPanel.length
                        })
                    }else{
                        getActions().getOrderByNegocioId2()
                        alert('new order')
                        setStore({
                            orderQty: store.ordersBusinessPanel.length
                        })
                    }
                },5000)     
            },
            isResponsePaypal: () => {
                if (sessionStorage.getItem('paymentChoise') && sessionStorage.getItem('addressChoise')) {
                    setStore({
                        responsePaypal: sessionStorage.getItem('responsePaypal'),
                        paymentChoise: sessionStorage.getItem('paymentChoise'),
                        addressChoise: sessionStorage.getItem('addressChoise')
                    })
                }
            },
            OrderOptions: (e) =>{
                sessionStorage.setItem(e.target.value, e.target.value)
            },

            /*  putOrder: () => {
                 const store = getStore();
                 const data = {
                     price: 200,
                     product_details: store.detail,
                     consumer_id: store.currentConsumer.consumer.id,
                     driver_id: 1
                 }
                 fetch(store.path + '/orders/' + store.currentOrder.id, {
                     method: 'PUT',
                     body: JSON.stringify(data),
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization':'Bearer '+ store.currentConsumer.access_token
                     }
                 })
                     .then(resp => resp.json())
                     .then(data => {
                         console.log(data)
                         if (data.msg) {
                             setStore({ orderError: data })
                         }
                         else {
                             setStore({
                                 price: '',
                                 product_details: '',
                                 consumer_id: '',
                                 driver_id: '',
                             })
                         }
                     })
             }, */


        }

    }
}
export default getState;