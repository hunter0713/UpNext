const ScheduleItem = require('./ScheduleItem');
const ScheduleReminder = require('./ScheduleReminder');
const db = require('../../knex_db');

module.exports = {
    eventsInfo,
    create,
    getById,
    update,
    deleteById
}

function eventsInfo() {
    const attrs = ['ScheduleItem.*', 'ScheduleEvent.start', 'ScheduleEvent.end', 'Entity.name'];
    return db
    .select(...attrs, db.raw("'event' as type"))
    .from('ScheduleEvent')
    .leftJoin('ScheduleItem', 'ScheduleEvent.id', 'ScheduleItem.id')
    .leftJoin('Entity', 'ScheduleItem.entity_id', 'Entity.id');
}

function create(event) {
    const { entity_id, title, description, start, end } = event;
    let obj = {};
    if(start) obj.start = start;
    if(end) obj.end = end;
    return ScheduleItem.create({ entity_id, title, description, type: 'event'})
    .then(item => 
        db('ScheduleEvent')
        .insert({ id: item.id, ...obj})
        .then(() => getById(item.id))
        .then(event => 
            (reminder 
            ? ScheduleReminder.create({...reminder, link_id: event.id})
            : Promise.resolve())
            .then(() => event)
        )
    );
}

function getById(id) {
    return eventsInfo()
    .where('ScheduleEvent.id', id)
    .then(events => events[0]);
}

function update(event) {
    const { id, title, description, start, end, reminder } = event;
    let obj = {};
    if(start) obj.start = start;
    if(end) obj.end = end;
    return ScheduleItem.update({id, title, description})
    .then(() => 
        (Object.keys(obj).length === 0
        ? Promise.resolve()
        : db('ScheduleEvent')
            .where({id})
            .update(obj))
        .then(() =>
            getById(id)
            .then(e =>
                (reminder 
                ? ScheduleReminder.create({...reminder, entity_id: e.entity_id, link_id: id})
                : Promise.resolve())
                .then(() => e)
            )
        )
    );
}

function deleteById(id) {
    return getById(id)
    .then(event => 
        ScheduleItem.deleteById(id)
        .then(() => event)   
    );
}