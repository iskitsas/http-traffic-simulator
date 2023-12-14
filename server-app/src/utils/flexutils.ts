import {Response} from "express";

export const flexutils = {
    API_NOT_SUPPORTED: 'This method is NOT supported. Set REQUIRE_AUTH=true to activate.',
    requiresAuth: !(process.env.REQUIRE_AUTH !== 'true')
}
