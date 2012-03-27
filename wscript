# vim: ft=python sw=2 sts=2 ts=2

# Note for whoever is reading this code: run away from this waf building system
# before too late.

import os

import Scripting
from Utils import ordered_dict
from Configure import conf

top = srcdir = '.'
out = blddir = 'build'

@conf
def add_node_export(self, key, value, quote='"'):
  table = self.env["NODE_EXPORTS"] or ordered_dict()
  value = str(value or '')
  if quote:
    value = "%s%s%s" % (quote, value, quote)
  table[str(key).upper()] = value
  self.env["NODE_EXPORTS"] = table

@conf
def write_node_module(self, filename, top=False):
  env = self.env

  if top:
    diff = ''
  else:
    diff = Utils.diff_path(self.srcdir, self.curdir)

  full = os.sep.join([self.blddir, env.variant(), diff, filename])
  full = os.path.normpath(full)
  (dir, base) = os.path.split(full)

  try: os.makedirs(dir)
  except: pass

  dest = open(full, 'w')
  dest.write(self.get_node_module())
  dest.close()

@conf
def get_node_module(self):
  table = self.env["NODE_EXPORTS"] or ordered_dict()
  module = ["exports['%s'] = %s;" % (key, table[key]) for key in table.allkeys]
  return "\n".join(module)

def set_options(opt):
  opt.tool_options('compiler_cxx')

def configure(conf):
  conf.recurse('vendor')

  conf.check_tool('compiler_cxx')
  conf.check_tool('node_addon')

  conf.define('MIMEMAGIC_MODULE_DIR', conf.curdir)
  conf.define('MIMEMAGIC_MAGIC_FILE', conf.env.LIBMAGIC_MAGIC_FILE)
  conf.write_config_header('config.h', top=True)

  conf.add_node_export('LIBMAGIC_FILE_BIN', conf.env.LIBMAGIC_FILE_BIN)
  conf.add_node_export('LIBMAGIC_MAGIC_FILE', conf.env.LIBMAGIC_MAGIC_FILE)
  conf.write_node_module('vendor.js', top=True)

def build(bld):
  bld.recurse('vendor')
  bld.add_group('nodejs ext')
  bld('cxx', 'cshlib', 'node_addon',
      cxxflags = ["-g", "-O2", "-Wall"],
      uselib = "MAGIC",
      source = 'src/mime-magic.cc',
      target = 'mime_magic')

def distclean(ctx):
  Scripting.distclean(ctx)
  ctx.recurse('vendor')
