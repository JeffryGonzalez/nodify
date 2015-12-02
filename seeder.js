var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose 
seeder.connect('mongodb://mongo:27017/stuff', function() {
    
    // Load Mongoose models 
    seeder.loadModels([
        'lib/modules/people/models/person'
        
    ]);
 
    // Clear specified collections 
    seeder.clearModels(['person'], function() {
 
        // Callback to populate DB once collections have been cleared 
        seeder.populateModels(data);
 
    });
});
 
// Data array containing seed data - documents organized by Model 
var data = [
    { 
        'model': 'person',
        'documents': [
            {
                'name': 'Jeffry',
                'age': 200
            },
            {
                'name': 'Stacey',
                'age': 40
            },
            {
                'name': 'Violet',
                'age': 7
            }
        ]
    }
];  