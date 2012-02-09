#!/usr/bin/python

##
# args: -p paths, -n newpaths, -v version, -gcc path, -gcco option
# example: ./builder.py paths.js ./npaths.js 234 ./compiler.jar WHITESPACE_ONLY
#

import sys
import json
import os
import re
import fcntl

# parse arg(getopt!!!)
path = sys.argv[1]
npath = sys.argv[2]
version = sys.argv[3]
pathgcc = sys.argv[4]
gcco = sys.argv[5]

# open -p
f = os.open(path, os.O_RDONLY)

fi = os.stat(path)

js = os.read(f, fi.st_size)

# json clean
js = re.sub(r'^this\.PATHS\s*=\s*', r'', js);
js = re.sub(r';*$', r'', js);
js = re.sub(r'//[^\n]*\r*\n', r'', js);

# json parse
jsv = json.loads(js);

# 
jsc = dict()
tmp = dict()
l10n = dict()
copy = dict()
paths = [];

# prepare
for item in jsv:
    if "buildTo" in item and "url" in item:
    	buildTo = re.sub(r'\.js$', "."+version+".js", item["buildTo"])
        if item.has_key("build") and item["build"] == "jsc": 
            if not jsc.has_key(buildTo): jsc[buildTo] =  []
            jsc[buildTo].append({"path": item["url"], "name": None})
        elif item.has_key("build") and item["build"] == "tmp": 
            if not tmp.has_key(buildTo): tmp[buildTo] =  []
            tmp[buildTo].append({"path": item["url"], "name": item["name"]})
        elif item.has_key("build") and item["build"] == "l10n":
            if not l10n.has_key(buildTo):  l10n[buildTo] =  []
            l10n[buildTo].append({"path": item["url"], "name": item["name"]})
        else :
            if not copy.has_key(buildTo): copy[buildTo] =  []
            copy[buildTo].append({"path": item["url"], "name": None})
        
# build
prefix = "../"

# tmp
for (key, value) in tmp.iteritems():
    f = os.open(key, os.O_CREAT | os.O_TRUNC | os.O_WRONLY)
    os.write(f, "window.Invoices = window.Invoices || {}; window.Invoices.TEMPLATE = window.Invoices.TEMPLATE || {};\n")
    for item in value:
        f1 = os.open(prefix+item["path"], os.O_RDONLY)
        f1i = os.stat(prefix+item["path"])
        s = os.read(f1, f1i.st_size)
        os.close(f1)
        s = re.sub(r'\r*\n|\t', r'', s)
        s = re.sub(r'"', r'\"', s)
        name = item["name"]
        name = name.decode("utf-8")
        s = s.decode("utf-8")
        s = "window.Invoices.TEMPLATE['"+name+"'] = \""+s+"\"\n"
        os.write(f, s.encode("utf-8"))
    os.close(f);

# l10n
for (key, value) in l10n.iteritems():
    f = os.open(key, os.O_CREAT | os.O_TRUNC | os.O_WRONLY)
    os.write(f, "window.Invoices = window.Invoices || {}; window.Invoices.L10N = window.Invoices.L10N || {};\n")
    for item in value:
        f1 = os.open(prefix+item["path"], os.O_RDONLY)
        f1i = os.stat(prefix+item["path"])
        s = os.read(f1, f1i.st_size)
        os.close(f1)
        s = re.sub(r'\r*\n|\t', r'', s)
        s = re.sub(r'"', r'\"', s)
        name = item["name"]
        name = name.decode("utf-8")
        s = s.decode("utf-8")
        s = "window.Invoices.L10N['"+name+"'] = \""+s+"\"\n"
        os.write(f, s.encode("utf-8"))
    os.close(f);

# copy
for (key, value) in copy.iteritems():
    f = os.open(key, os.O_CREAT | os.O_TRUNC | os.O_WRONLY)
    for item in value:
        f1 = os.open(prefix+item["path"], os.O_RDONLY)
        f1i = os.stat(prefix+item["path"])
        s = os.read(f1, f1i.st_size)
        os.close(f1)
        os.write(f, s)
    os.close(f);
    
# jsc
for (key, value) in jsc.iteritems():
     cmd = 'java -jar '+pathgcc+' --js_output_file '+key+' --compilation_level '+gcco
     for item in value:
     	cmd += ' --js '+prefix+item["path"]
     os.system(cmd)
     
# new paths
for key in copy.keys():
	paths.append({"type": "js", "url": key})
for key in l10n.keys():
	paths.append({"type": "js", "url": key})
for key in tmp.keys():
	paths.append({"type": "js", "url": key})
for key in jsc.keys():
	paths.append({"type": "js", "url": key})

s = "this.PATHS = [";
for item in paths:
	typ = item["type"]
	url = item["url"]
	s += "{\"type\":\""+typ.decode("utf-8")+"\", \"url\":\""+url.decode("utf-8")+"\"}"
s += "];"
f = os.open(npath, os.O_CREAT | os.O_TRUNC | os.O_WRONLY)
os.write(f, s.encode("utf-8"))
os.close(f)


    
        
