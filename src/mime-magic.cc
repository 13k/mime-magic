#define BUILDING_NODE_EXTENSION

#include <node.h>
#include "magic.h"
#include "config.h"

using namespace v8;

Handle<Value> lookupSync(const Arguments& args) {
  HandleScope scope;
  magic_t cookie;
  const char *mimetype;

  if (args.Length() > 0 && args[0]->IsString()) {
    String::Utf8Value filename(args[0]);

    cookie = magic_open(
        MAGIC_SYMLINK |
        MAGIC_MIME_TYPE |
        MAGIC_NO_CHECK_COMPRESS |
        MAGIC_NO_CHECK_ELF);

    if (cookie == NULL) {
      ThrowException(Exception::Error(String::New("magic_open error")));
      return scope.Close(Undefined());
    }

    if (magic_load(cookie, MIMEMAGIC_MAGIC_FILE) == -1) {
      ThrowException(Exception::Error(String::Concat(String::New("magic_load error: "), String::New(magic_error(cookie)))));
      magic_close(cookie);
      return scope.Close(Undefined());
    }

    mimetype = magic_file(cookie, *filename);

    if (mimetype == NULL) {
      ThrowException(Exception::Error(String::Concat(String::New("magic_file error: "), String::New(magic_error(cookie)))));
      magic_close(cookie);
      return scope.Close(Undefined());
    }

    Local<String> result = String::New(mimetype);
    magic_close(cookie);
    
    return scope.Close(result);
  }

  return scope.Close(Undefined());
}

static void init(Handle<Object> target) {
  target->Set(String::NewSymbol("lookupSync"),
      FunctionTemplate::New(lookupSync)->GetFunction());
}

NODE_MODULE(mime_magic, init)
