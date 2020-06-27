/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Docker = require('dockerode'),
    fs = require('fs'),
    Path = require('path');

class DockerManager {
    constructor(manager) {
        this.manager = manager;
    }

    init() {
        let keys = {};
        if (fs.existsSync(Path.join(this.manager.getPath("keys"), 'docker_ca.pem'))) keys["ca"] = Path.join(this.manager.getPath("keys"), 'docker_ca.pem');
        if (fs.existsSync(Path.join(this.manager.getPath("keys"), 'docker_cert.pem'))) keys["cert"] = Path.join(this.manager.getPath("keys"), 'docker_cert.pem');
        if (fs.existsSync(Path.join(this.manager.getPath("keys"), 'docker_key.pem'))) keys["key"] = Path.join(this.manager.getPath("keys"), 'docker_key.pem');
        if (this.manager.getConfig().get("docker.socketPath").value()) {
            this.docker = new Docker({
                socketPath: "//./pipe/docker_engine",
                version: this.manager.getConfig().get("docker.version").value(),
                ...keys,
            });
        } else {
            this.docker = new Docker({
                host: this.manager.getConfig().get("docker.hostname").value(),
                port: this.manager.getConfig().get("docker.port").value(),
                version: this.manager.getConfig().get("docker.version").value(),
                ...keys,
            });
        }
        this.manager.getLogger().info("Initialized Docker");
    }
}

module.exports = DockerManager;
