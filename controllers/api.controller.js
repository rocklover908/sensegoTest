let Data = require('../models/data.model');


module.exports.collectData = function (req, res) {

    if (req.body == '' || req.body.user_id == '' || req.body.app == '' || req.body.timestamp == '') {
        res.status(402);
        res.send({
            'error': 'EmptyRequest'
        });
        return;
    } else {
        let data = new Data(req.body);
        data.save()
            .then(datat => {

                res.status(200);
                res.send('Data is added successfully');
            })
            .catch(err => {
                res.status(401);
                res.send({
                    'error': 'unable to save to database'
                });

            });
    }
    return;
};


module.exports.calculateStatistiques = function (req, res) {
    let userid = req.query.userid;

    var d = new Date();
    now = new Date()
    d.setDate(d.getDate() - 7);
    Data.find({
        user_id: userid, timestamp: {
            $gte: d,
            $lte: now
        }
    }, function (err, datats) {
        if (err) {
            res.status(401);
            res.send({
                'error': 'There was a problem of Database connection Retry later'
            });
        } else {
            //Retourner le nombre d'application lauched durant les  7 dernier jours
            let numberofApplaunched = [];
            numberofApplaunched = datats.map((ele) => { return ele.app });
            let app_launched = Array.from(new Set(numberofApplaunched)).length

            // retouner les dates retourner par la requete 
            let dates = datats.map((ele) => {
                date = new Date(ele.timestamp)
                return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
            });

            //Calculer l'occurence de chaque date
            var dateOccurrences = {};
            for (var i = 0, j = dates.length; i < j; i++) {
                dateOccurrences[dates[i]] = (dateOccurrences[dates[i]] || 0) + 1;
            }
            //Retourner la date à laquelle l'utilisateur est le plus active et le nombre des jours actives
            most_active_day_last_7_days = '';
            max = 0;
            number_of_days_active_last_7_days = 0
            for (let [i, element] of Object.entries(dateOccurrences)) {
                number_of_days_active_last_7_days++;
                if (element > max) {
                    max = element
                    most_active_day_last_7_days = i
                }
            };
            //Retourner l'occurence de chaque applications
            var appsOccurences = {};
            for (var i = 0, j = numberofApplaunched.length; i < j; i++) {
                appsOccurences[numberofApplaunched[i]] = (appsOccurences[numberofApplaunched[i]] || 0) + 1;
            }
            //chercher l'application qui a l'occurence maximale
            most_launched_app_last_7_days = ''
            max = 0
            for (let [i, element] of Object.entries(appsOccurences)) {
                if (element > max) {
                    max = element
                    most_launched_app_last_7_days = i
                }
            };

            res.status(200);
            res.send({
                "user_id": userid,
                "app_launched": app_launched,
                "most_active_day_last_7_days": most_active_day_last_7_days,
                "number_of_days_active_last_7_days": number_of_days_active_last_7_days,
                "most_launched_app_last_7_days": most_launched_app_last_7_days

            });
        }
    });
};


