/*
    Aislinn Richardson  301146892
    Fatima Dabbous      301368242
    Omer Yousif         30109346
    Hashi Mohamed       300787311
    Ahmed Yafeai        301509099
    Tahseen Ahmed       301544487

    ======= SportsPass =======

    Validates event data before requests reach event controllers

*/

import mongoose from 'mongoose';

const allowedStatuses = [
    'Active',
    'Full',
    'Completed',
    'Cancelled',
    'Expired'
];

const validateFields = (body, requireAllFields) => {

    const errors = [];

    const requiredFields = [
        'title',
        'sport',
        'description',
        'location',
        'startDate',
        'price',
        'availableTickets'
    ];

    if (requireAllFields) {
        for (const field of requiredFields) {
            if (
                body[field] === undefined ||
                body[field] === null ||
                body[field] === ''
            ) {
                errors.push(`${field} is required`);
            }
        }
    }


    for (const field of [
        'title',
        'sport',
        'description',
        'location'
    ]) {

        if (
            field in body &&
            (typeof body[field] !== 'string' ||
            body[field].trim() === '')
        ) {
            errors.push(`${field} must be a non-empty string`);
        }
    }


    if (
        'startDate' in body &&
        Number.isNaN(Date.parse(body.startDate))
    ) {
        errors.push('startDate must be valid');
    }


    if (
        'endDate' in body &&
        body.endDate !== null &&
        Number.isNaN(Date.parse(body.endDate))
    ) {
        errors.push('endDate must be valid');
    }


    if (
        'price' in body &&
        (typeof body.price !== 'number' || body.price < 0)
    ) {
        errors.push(
            'price must be a number greater than or equal to 0'
        );
    }


    if (
        'availableTickets' in body &&
        (!Number.isInteger(body.availableTickets) ||
        body.availableTickets < 0)
    ) {
        errors.push(
            'availableTickets must be a whole number greater than or equal to 0'
        );
    }


    if (
        'status' in body &&
        !allowedStatuses.includes(body.status)
    ) {
        errors.push(
            `status must be one of: ${allowedStatuses.join(', ')}`
        );
    }


    return errors;
};


export const validateEventCreate = (req, res, next) => {

    const errors = validateFields(req.body, true);

    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Event validation failed',
            details: errors
        });
    }

    next();
};


export const validateEventUpdate = (req, res, next) => {

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'At least one field is required'
        });
    }


    const errors = validateFields(req.body, false);


    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Event validation failed',
            details: errors
        });
    }


    next();
};


export const validateEventId = (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
        return res.status(400).json({
            error: 'Invalid event ID'
        });
    }

    next();
};