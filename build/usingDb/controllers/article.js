"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _db = _interopRequireDefault(require("../db"));
var _helper = _interopRequireDefault(require("./helper.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Article = {
  addArticle: function addArticle(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var tags, mySQLCreated, createQuery, idQuery, values, result, insertId;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            console.log("Running addArticle");
            tags = req.body.tags;
            mySQLCreated = (0, _moment["default"])(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            createQuery = "\n      INSERT INTO article (heading, story, category, year_event, created, created_by)\n      VALUES (?,?,?,?,?,?);\n    ";
            idQuery = "SELECT LAST_INSERT_ID();";
            console.log("created", mySQLCreated);
            values = [req.body.heading, req.body.story, req.body.category, req.body.year, mySQLCreated, req.user.username];
            _context.prev = 7;
            _context.next = 10;
            return _db["default"].query(createQuery, values);
          case 10:
            result = _context.sent;
            _context.next = 13;
            return _db["default"].query(idQuery);
          case 13:
            insertId = _context.sent;
            if (tags) {
              console.log("Needs to update tags", tags);
              console.log("insertId", insertId);
              Article.editTags(insertId[0]['LAST_INSERT_ID()'], tags);
            }
            console.log("RESULT", result);
            return _context.abrupt("return", res.status(201).end());
          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](7);
            console.log("Error in addArticle", _context.t0);
            return _context.abrupt("return", res.status(400).send(_context.t0));
          case 23:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[7, 19]]);
    }))();
  },
  editArticle: function editArticle(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var mySQLUpdated, tags, createQuery, values;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            mySQLUpdated = (0, _moment["default"])(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            console.log("Running editArticle");
            console.log("req.body", req.body);
            tags = req.body.tags;
            console.log("tags", tags);
            if (tags) {
              console.log("Needs to update tags", tags);
              Article.editTags(req.body.id, tags);
            }
            createQuery = "\n      UPDATE article \n      SET \n        heading = ?,\n        story = ?,\n        category = ?,\n        year_event = ?,\n        updated = ?,\n        updated_by = ?\n      WHERE\n        id = ?;\n     ";
            values = [req.body.heading, req.body.story, req.body.category, req.body.year, mySQLUpdated, req.user.username, req.body.id];
            _context2.prev = 8;
            _context2.next = 11;
            return _db["default"].query(createQuery, values);
          case 11:
            return _context2.abrupt("return", res.status(201).end());
          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](8);
            console.log("Error in addArticle", _context2.t0);
            return _context2.abrupt("return", res.status(400).send(_context2.t0));
          case 18:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[8, 14]]);
    }))();
  },
  deleteArticle: function deleteArticle(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var mySQLDeleted, articleId, createQuery, values;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            mySQLDeleted = (0, _moment["default"])(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            console.log("Running deleteArticle");
            console.log("req.body", req.body);
            articleId = req.body.id;
            createQuery = "\n      UPDATE article \n      SET \n        removed = ?\n      WHERE\n        id = ?;\n     ";
            values = [mySQLDeleted, articleId];
            _context3.prev = 6;
            _context3.next = 9;
            return _db["default"].query(createQuery, values);
          case 9:
            return _context3.abrupt("return", res.status(201).end());
          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](6);
            console.log("Error in deleteArticle", _context3.t0);
            return _context3.abrupt("return", res.status(400).send(_context3.t0));
          case 16:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[6, 12]]);
    }))();
  },
  removePermanently: function removePermanently(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var articleIds, tagArticleQuery, createQuery, values;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            articleIds = req.body.ids.join(",");
            tagArticleQuery = "\n      DELETE from article_tag\n      WHERE\n        article_id IN (?)\n    ";
            createQuery = "\n      DELETE from article\n      WHERE\n        removed \n      AND\n        id IN (?)\n    ";
            values = [articleIds];
            _context4.prev = 4;
            _context4.next = 7;
            return _db["default"].query(tagArticleQuery, values);
          case 7:
            _context4.next = 9;
            return _db["default"].query(createQuery, values);
          case 9:
            return _context4.abrupt("return", res.status(201).end());
          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](4);
            console.log("Error in removePermanently", _context4.t0);
            return _context4.abrupt("return", res.status(400).send(_context4.t0));
          case 16:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[4, 12]]);
    }))();
  },
  getArticles: function getArticles(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var createQuery, rows;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            createQuery = "\n      SELECT * from article;\n    ";
            _context5.prev = 1;
            _context5.next = 4;
            return _db["default"].query(createQuery);
          case 4:
            rows = _context5.sent;
            return _context5.abrupt("return", res.status(200).send(rows));
          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            console.log("Error in getArticles", _context5.t0);
            return _context5.abrupt("return", res.status(400).send(_context5.t0));
          case 12:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[1, 8]]);
    }))();
  },
  editTags: function editTags(articleId, tags) {
    var _this = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var tagQuery, tagArticleQuery, allTags, oldTags, newTags, existingTags, tagsRemove, _loop, i, _loop2, q, newTableTags, tagsFound, _loop3, _i;
      return _regeneratorRuntime().wrap(function _callee6$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            console.log("articleId", articleId);
            console.log("tags", tags);
            tagQuery = "\n      SELECT * FROM tag\n      ";
            tagArticleQuery = "\n      SELECT tag.id, tag.tag_name \n      FROM tag\n      JOIN article_tag \n      ON article_tag.tag_id = tag.id\n      WHERE article_tag.article_id = ?\n      ;\n    ";
            _context9.next = 6;
            return _db["default"].query(tagQuery);
          case 6:
            allTags = _context9.sent;
            _context9.next = 9;
            return _db["default"].query(tagArticleQuery, [articleId]);
          case 9:
            oldTags = _context9.sent;
            console.log("oldTags", oldTags);
            console.log("allTags", allTags);
            newTags = [];
            existingTags = [];
            tagsRemove = [];
            _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(i) {
              var tagHits;
              return _regeneratorRuntime().wrap(function _loop$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    console.log("tag", tags[i]);
                    tagHits = oldTags.filter(function (x) {
                      return x.tag_name.toLowerCase() === tags[i].text.toLowerCase();
                    });
                    if (tagHits.length > 0) {
                      existingTags.push(tags[i]);
                    } else {
                      newTags.push(tags[i]);
                    }
                  case 3:
                  case "end":
                    return _context6.stop();
                }
              }, _loop);
            });
            _context9.t0 = _regeneratorRuntime().keys(tags);
          case 17:
            if ((_context9.t1 = _context9.t0()).done) {
              _context9.next = 22;
              break;
            }
            i = _context9.t1.value;
            return _context9.delegateYield(_loop(i), "t2", 20);
          case 20:
            _context9.next = 17;
            break;
          case 22:
            console.log("oldTags", oldTags);
            _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2(q) {
              var noTags;
              return _regeneratorRuntime().wrap(function _loop2$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    noTags = existingTags.filter(function (t) {
                      return t.text.toLowerCase() === oldTags[q].tag_name.toLowerCase();
                    });
                    if (noTags < 1) {
                      tagsRemove.push(oldTags[q]);
                    }
                  case 2:
                  case "end":
                    return _context7.stop();
                }
              }, _loop2);
            });
            _context9.t3 = _regeneratorRuntime().keys(oldTags);
          case 25:
            if ((_context9.t4 = _context9.t3()).done) {
              _context9.next = 30;
              break;
            }
            q = _context9.t4.value;
            return _context9.delegateYield(_loop2(q), "t5", 28);
          case 28:
            _context9.next = 25;
            break;
          case 30:
            console.log("tagsRemove", tagsRemove);
            newTableTags = [];
            tagsFound = [];
            _loop3 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop3(_i) {
              var hits;
              return _regeneratorRuntime().wrap(function _loop3$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    hits = newTags.filter(function (q) {
                      return q.text.toLowerCase() === allTags[_i].tag_name.toLowerCase();
                    });
                    console.log("hits", hits);
                    if (hits.length > 0) {
                      tagsFound.push(hits[0]);
                    }
                  case 3:
                  case "end":
                    return _context8.stop();
                }
              }, _loop3);
            });
            _context9.t6 = _regeneratorRuntime().keys(allTags);
          case 35:
            if ((_context9.t7 = _context9.t6()).done) {
              _context9.next = 40;
              break;
            }
            _i = _context9.t7.value;
            return _context9.delegateYield(_loop3(_i), "t8", 38);
          case 38:
            _context9.next = 35;
            break;
          case 40:
            newTableTags = newTags.filter(function (tag) {
              return !tagsFound.includes(tag);
            });
            console.log("newTableTags", newTableTags);
            _this.removeTags(tagsRemove, articleId);
            _this.insertTags(newTableTags, newTags, articleId);
            console.log("tagsFound", tagsFound);
            console.log("newTableTags", newTableTags);
            console.log("newTags", newTags);
            console.log("existingTags", existingTags);
          case 48:
          case "end":
            return _context9.stop();
        }
      }, _callee6);
    }))();
  },
  getStoryTags: function getStoryTags(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var createQuery, removeTagsQuery, emptyTagsQuery, tagIds, idsRemove, rows;
      return _regeneratorRuntime().wrap(function _callee7$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            createQuery = "\n      SELECT * from tag;\n      ";
            removeTagsQuery = "\n      DELETE FROM tag \n      WHERE    \n        id in (?)\n      ";
            emptyTagsQuery = "\n      SELECT id FROM tag \n      WHERE tag.id NOT IN (\n        SELECT tag.id FROM tag INNER JOIN article_tag atag ON atag.tag_id = tag.id\n      );\n    ";
            tagIds = [];
            _context10.prev = 4;
            _context10.next = 7;
            return _db["default"].query(emptyTagsQuery);
          case 7:
            tagIds = _context10.sent;
            idsRemove = tagIds.map(function (e) {
              return e.id;
            });
            console.log("idsRemove", idsRemove);
            if (!idsRemove.length) {
              _context10.next = 13;
              break;
            }
            _context10.next = 13;
            return _db["default"].query(removeTagsQuery, [idsRemove]);
          case 13:
            _context10.next = 15;
            return _db["default"].query(createQuery);
          case 15:
            rows = _context10.sent;
            return _context10.abrupt("return", res.status(200).send(rows));
          case 19:
            _context10.prev = 19;
            _context10.t0 = _context10["catch"](4);
            console.log("Error in getStoryTags", _context10.t0);
            return _context10.abrupt("return", res.status(400).send(_context10.t0));
          case 23:
          case "end":
            return _context10.stop();
        }
      }, _callee7, null, [[4, 19]]);
    }))();
  },
  getTagLinks: function getTagLinks(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var createQuery, rows;
      return _regeneratorRuntime().wrap(function _callee8$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            createQuery = "\n      SELECT * from article_tag;\n    ";
            _context11.prev = 1;
            _context11.next = 4;
            return _db["default"].query(createQuery);
          case 4:
            rows = _context11.sent;
            return _context11.abrupt("return", res.status(200).send(rows));
          case 8:
            _context11.prev = 8;
            _context11.t0 = _context11["catch"](1);
            console.log("Error in getTagLinks", _context11.t0);
            return _context11.abrupt("return", res.status(400).send(_context11.t0));
          case 12:
          case "end":
            return _context11.stop();
        }
      }, _callee8, null, [[1, 8]]);
    }))();
  },
  insertTags: function insertTags(newTableTags, newTags, articleId) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      var queryInsert, queryFind, queryInsertTagLink, q, dbNewTags, j, tag, s;
      return _regeneratorRuntime().wrap(function _callee9$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            queryInsert = "\n      INSERT INTO tag (tag_name)\n      VALUES (?)\n      ;\n    ";
            queryFind = "\n      SELECT * FROM tag \n      WHERE \n        tag_name = ?\n      LIMIT 1\n      ;\n      ";
            queryInsertTagLink = "\n      INSERT INTO article_tag (article_id, tag_id)\n      VALUES (?, ?)\n    ";
            _context12.t0 = _regeneratorRuntime().keys(newTableTags);
          case 4:
            if ((_context12.t1 = _context12.t0()).done) {
              _context12.next = 10;
              break;
            }
            q = _context12.t1.value;
            _context12.next = 8;
            return _db["default"].query(queryInsert, [newTableTags[q].text]);
          case 8:
            _context12.next = 4;
            break;
          case 10:
            console.log("newTags", newTags);
            dbNewTags = [];
            _context12.t2 = _regeneratorRuntime().keys(newTags);
          case 13:
            if ((_context12.t3 = _context12.t2()).done) {
              _context12.next = 22;
              break;
            }
            j = _context12.t3.value;
            _context12.next = 17;
            return _db["default"].query(queryFind, [newTags[j].text]);
          case 17:
            tag = _context12.sent;
            console.log("tag from newTags", tag);
            dbNewTags.push(tag[0]);
            _context12.next = 13;
            break;
          case 22:
            console.log("dbNewTags", dbNewTags);
            _context12.t4 = _regeneratorRuntime().keys(dbNewTags);
          case 24:
            if ((_context12.t5 = _context12.t4()).done) {
              _context12.next = 31;
              break;
            }
            s = _context12.t5.value;
            console.log("dbNewTags[s]", dbNewTags[s]);
            _context12.next = 29;
            return _db["default"].query(queryInsertTagLink, [articleId, dbNewTags[s].id]);
          case 29:
            _context12.next = 24;
            break;
          case 31:
            console.log("dbNewTags", dbNewTags);
          case 32:
          case "end":
            return _context12.stop();
        }
      }, _callee9);
    }))();
  },
  removeTags: function removeTags(tagsRemove, articleId) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
      var queryRemoveTags, findArticleTags, deleteTag, i, remainingTags;
      return _regeneratorRuntime().wrap(function _callee10$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            queryRemoveTags = "\n      DELETE FROM article_tag\n      WHERE \n        article_id = ?\n      AND\n        tag_id = ?\n    ";
            findArticleTags = "\n      SELECT * FROM article_tag\n      WHERE tag_id = ?\n    ";
            deleteTag = "\n      DELETE FROM TAG WHERE id = ?\n    ";
            _context13.t0 = _regeneratorRuntime().keys(tagsRemove);
          case 4:
            if ((_context13.t1 = _context13.t0()).done) {
              _context13.next = 18;
              break;
            }
            i = _context13.t1.value;
            _context13.next = 8;
            return _db["default"].query(queryRemoveTags, [articleId, tagsRemove[i].id]);
          case 8:
            _context13.next = 10;
            return _db["default"].query(findArticleTags, [tagsRemove[i].id]);
          case 10:
            remainingTags = _context13.sent;
            console.log("remainingTags", remainingTags);
            if (!(remainingTags.length < 1)) {
              _context13.next = 16;
              break;
            }
            console.log("Running SQL to remove tag");
            _context13.next = 16;
            return _db["default"].query(deleteTag, [tagsRemove[i].id]);
          case 16:
            _context13.next = 4;
            break;
          case 18:
          case "end":
            return _context13.stop();
        }
      }, _callee10);
    }))();
  },
  getCategories: function getCategories(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
      var createQuery, rows;
      return _regeneratorRuntime().wrap(function _callee11$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            createQuery = "SELECT * FROM category";
            _context14.prev = 1;
            _context14.next = 4;
            return _db["default"].query(createQuery);
          case 4:
            rows = _context14.sent;
            return _context14.abrupt("return", res.status(200).send(rows));
          case 8:
            _context14.prev = 8;
            _context14.t0 = _context14["catch"](1);
            console.log("Error in getCategories", _context14.t0);
            return _context14.abrupt("return", res.status(400).send(_context14.t0));
          case 12:
          case "end":
            return _context14.stop();
        }
      }, _callee11, null, [[1, 8]]);
    }))();
  }
};
var _default = Article;
exports["default"] = _default;