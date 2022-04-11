from flask import Blueprint, render_template, send_from_directory, request, Response
import glob
import os
import pandas as pd
import json
import docker

area = Blueprint('area', __name__)


@area.route("/area")
def getArea():
    return render_template('area.html')

@area.route("/area/update", methods=['GET'])
def areaUpdate():
    print("Want to Restart the Docker!")
    stream = os.popen('docker container restart datascience_fyp_yolo_1')
    output = stream.read()
    print(output)
    # client = docker.DockerClient(base_url='tcp://127.0.0.1:2375')
    # container="person_hat:latest"
    # client.restart(container)
    return str("Success");