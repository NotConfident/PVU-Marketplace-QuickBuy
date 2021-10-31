from flask import Flask, abort, request
from flask_restful import Resource, Api, reqparse
from flask import Response
import json
from flask_cors import CORS, cross_origin


def checkWhiteList():
    f = open("whitelistAddresses.txt", "r")
    file = f.read()
    
    temp = ''
    addresses = []

    for i in file:
        if(i != ',' or i != ' '):
            temp += i
        if(i == ','):
            addresses.append(temp)
            temp = ''
    addresses = [i.replace('\n', '') for i in addresses]
    addresses = [i.replace(',', '') for i in addresses]

    return addresses

def checkTnC():
    f = open("TnC.txt", "r")
    file = f.read()
    
    temp = ''
    addresses = []

    for i in file:
        if(i != ',' or i != ' '):
            temp += i
        if(i == ','):
            addresses.append(temp)
            temp = ''
    addresses = [i.replace('\n', '') for i in addresses]
    addresses = [i.replace(',', '') for i in addresses]

    return addresses

class readID(Resource):
    def get(self):
        global addresses
        parser = reqparse.RequestParser()

        parser.add_argument('wallet', required=True)
        args = parser.parse_args()

        addresses = checkWhiteList()
        print(addresses)

        if args['wallet'] not in addresses:
            abort(403) 
        else:
            return Response(json.dumps(args['wallet'] in addresses),  mimetype='application/json')

class create(Resource):
    def post(self):
        parser = reqparse.RequestParser()  # initialize

        parser.add_argument('address', required=True)  # add arguments
        parser.add_argument('txHash', required=True)

        args = parser.parse_args()  # parse arguments to dictionary

        addresses = checkWhiteList()
        print(addresses)

        if args['address'] not in addresses:
            abort(404)
        else:
            documentation = open("documentation.txt", "a")
            documentation.write("Address: " + args['address'] + "\nTransaction Hash: " + args['txHash'] + "\n\n")
            documentation.close()
            return Response(json.dumps({'success':True}), 200, {'ContentType':'application/json'})

class returnCheckTnC(Resource):
    def get(self):
        global addresses
        parser = reqparse.RequestParser()

        parser.add_argument('wallet', required=True)
        args = parser.parse_args()

        addresses = checkTnC()
        print(addresses)

        if args['wallet'] not in addresses:
            abort(403) 
        else:
            return Response(json.dumps(args['wallet'] in addresses),  mimetype='application/json')

class agreeTnC(Resource):
    def post(self):
        parser = reqparse.RequestParser()  # initialize

        parser.add_argument('wallet', required=True)  # add arguments

        args = parser.parse_args()  # parse arguments to dictionary

        addresses = checkTnC()
        print(addresses)

        tnc = open("TnC.txt", "a")
        tnc.write(args['wallet'] + "," + "\n")
        tnc.close()
        return Response(json.dumps({'success':True}), 200, {'ContentType':'application/json'})

app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(readID, '/readAddress')
api.add_resource(returnCheckTnC, '/checkTnc')
api.add_resource(agreeTnC, '/agreeTnC')
api.add_resource(create, '/documentation')

# @app.before_request
# def limit_remote_addr():
#     if request.remote_addr != '13.250.199.131:8000/':
#         abort(403)  # Forbidden

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)


