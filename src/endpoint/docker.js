/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Endpoint = require('../api/Endpoint');

class Docker extends Endpoint {
    constructor(props) {
        super(props, {
            path: '/docker/containers',
            types: ['get'],
            description: 'Get a list of docker containers.',
            errors: [],
            returns: ["dockerContainerList", {
                error: "error"
            }]
        });
    }

    run(reqinfo, info, res) {
        this.manager.getDockerManager().docker.listContainers({
            all: true
        }, (d) => {
            console.log(d);
            res.status(200).json(d);
        })
        return {nosend: true}
    }
}

module.exports = Docker;
