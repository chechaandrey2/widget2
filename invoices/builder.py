#!/usr/bin/python

##
# args: -p paths, -v version, -gcc path, -gcco option
#

import sys
import json
import os
import re
import fcntl

# parse arg
path = sys.argv[1]
pathgcc = sys.argv[3]
pathgcco = sys.argv[4]

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

# prepare
for item in jsv:
    if "buildTo" in item and "url" in item: 
        if item.has_key("build") and item["build"] == "jsc": 
            if not jsc.has_key(item["buildTo"]): jsc[item["buildTo"]] =  []
            jsc[item["buildTo"]].append({"path": item["url"], "name": None})
        elif item.has_key("build") and item["build"] == "tmp": 
            if not tmp.has_key(item["buildTo"]): tmp[item["buildTo"]] =  []
            tmp[item["buildTo"]].append({"path": item["url"], "name": item["name"]})
        elif item.has_key("build") and item["build"] == "l10n":
            if not l10n.has_key(item["buildTo"]):  l10n[item["buildTo"]] =  []
            l10n[item["buildTo"]].append({"path": item["url"], "name": item["name"]})
        else :
             if not copy.has_key(item["buildTo"]): copy[item["buildTo"]] =  []
             copy[item["buildTo"]].append({"path": item["url"], "name": None})
        
# build
prefix = "../"

# tmp
#for (key, value) in tmp.iteritems():
#    f = os.open(key, os.O_CREAT | os.O_TRUNC | os.O_WRONLY)
#    os.write(f, "window.Invoices = window.Invoices || {}; window.Invoices.TEMPLATE = window.Invoices.TEMPLATE || {};\n")
#    for item in value:
#        f1 = os.open(prefix+item["path"], os.O_RDONLY)
#        f1i = os.stat(prefix+item["path"])
#        s = os.read(f1, f1i.st_size)
#        s = re.sub(r'\r*\n|\t', r'', s)
#        s = re.sub(r'"', r'\"', s)
#        name = item["name"]
#        name = name.decode("utf-8")
#        s = s.decode("utf-8")
#        s = "window.Invoices.TEMPLATE['"+name+"'] = \""+s+"\"\n"
#        os.write(f, s.encode("utf-8"))
#    os.close(f);

# l10n
#for (key, value) in l10n.iteritems():
#    f = os.open(key, os.O_CREAT | os.O_TRUNC | os.O_WRONLY)
#    os.write(f, "window.Invoices = window.Invoices || {}; window.Invoices.L10N = window.Invoices.L10N || {};\n")
#    for item in value:
#        f1 = os.open(prefix+item["path"], os.O_RDONLY)
#        f1i = os.stat(prefix+item["path"])
#        s = os.read(f1, f1i.st_size)
#        s = re.sub(r'\r*\n|\t', r'', s)
#        s = re.sub(r'"', r'\"', s)
#        name = item["name"]
#        name = name.decode("utf-8")
#        s = s.decode("utf-8")
#        s = "window.Invoices.L10N['"+name+"'] = \""+s+"\"\n"
#        os.write(f, s.encode("utf-8"))
#    os.close(f);

# copy
#for (key, value) in copy.iteritems():
#    f = os.open(key, os.O_CREAT | os.O_TRUNC | os.O_WRONLY)
#    for item in value:
#        f1 = os.open(prefix+item["path"], os.O_RDONLY)
#        f1i = os.stat(prefix+item["path"])
#        s = os.read(f1, f1i.st_size)
#        os.write(f, s)
#    os.close(f);
    
# jsc
for (key, value) in jsc.iteritems():
     cmd = 'java -jar '+pathgcc+' --js_output_file '+key+' --compilation_level '+pathgcco
     for item in value:
        cmd = cmd+' --js '+item
    # java
    #os.system(cmd)
    print(cmd)
    
        
