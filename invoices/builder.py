#!/usr/bin/python

##
# args: paths, newpaths, version, gccpath, gccoption
# example: $ ./builder.py paths.js npath.js "0.1.0" compiler.jar WHITESPACE_ONLY
#

import sys
import json
import os
import re
import fcntl
import getopt

# parse arg
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
        if item.has_key("build") and item["build"] == "jsc":
            buildTo = re.sub(r'\.js$', "."+version+".js", item["buildTo"])
            if not jsc.has_key(buildTo): jsc[buildTo] =  []
            jsc[buildTo].append({"path": item["url"], "name": None})
        elif item.has_key("build") and item["build"] == "tmp":
            buildTo = re.sub(r'\.js$', "."+version+".js", item["buildTo"])
            if not tmp.has_key(buildTo): tmp[buildTo] =  []
            tmp[buildTo].append({"path": item["url"], "name": item["name"]})
        elif item.has_key("build") and item["build"] == "l10n":
            buildTo = re.sub(r'\.js$', "."+version+".js", item["buildTo"])
            if not l10n.has_key(buildTo):  l10n[buildTo] =  []
            l10n[buildTo].append({"path": item["url"], "name": item["name"]})
        else :
            buildTo = item["buildTo"];
            if not copy.has_key(buildTo): copy[buildTo] =  []
            copy[buildTo].append({"path": item["url"], "name": None})
        paths.append(buildTo)
        
# build
prefix = "../"

# tmp
for (key, value) in tmp.iteritems():
    f = os.open(prefix+key, os.O_CREAT | os.O_TRUNC | os.O_WRONLY)
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
    f = os.open(prefix+key, os.O_CREAT | os.O_TRUNC | os.O_WRONLY)
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
    f = os.open(prefix+key, os.O_CREAT | os.O_TRUNC | os.O_WRONLY)
    for item in value:
        f1 = os.open(prefix+item["path"], os.O_RDONLY)
        f1i = os.stat(prefix+item["path"])
        s = os.read(f1, f1i.st_size)
        os.close(f1)
        os.write(f, s)
    os.close(f);
    
# jsc
for (key, value) in jsc.iteritems():
     cmd = 'java -jar '+pathgcc+' --js_output_file '+prefix+key+' --compilation_level '+gcco
     for item in value:
     	cmd += ' --js '+prefix+item["path"]
     os.system(cmd)
     
# new paths
upaths = []
paths.reverse()
for item in paths:
    st = 0
    for i in upaths:
        if i == item: 
            st = 1
            break
    if st == 0: upaths.append(item)

s = []
upaths.reverse()
for item in upaths:
	typ = "js"
	url = item
	s.append("\t{\"type\":\""+typ.decode("utf-8")+"\", \"url\":\""+url.decode("utf-8")+"\"}")
f = os.open(npath, os.O_CREAT | os.O_TRUNC | os.O_WRONLY)
s = "this.PATHS = [\n"+',\n'.join(s)+ "\n];"
os.write(f, s.encode("utf-8"))
os.close(f)
