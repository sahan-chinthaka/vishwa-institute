import mongoos from 'mongoose';
const yearCountSchema = new mongoos.Schema({ 
    year: { type: Number, required: true },
    count: { type: Number, required: true },
   });

const YearCount = mongoos.models.YearCount || mongoos.model('YearCount', yearCountSchema);
export default YearCount;