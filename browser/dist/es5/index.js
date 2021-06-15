/* [@simplewebauthn/browser]  Version: 3.0.0 - Wednesday, June 16th, 2021, 12:13:41 AM */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// var tslib = require('tslib');

function utf8StringToBuffer(value) {
    return new TextEncoder().encode(value);
}

function bufferToBase64URLString(buffer) {
    var e_1, _a;
    var bytes = new Uint8Array(buffer);
    var str = '';
    try {
        for (var bytes_1 = tslib.__values(bytes), bytes_1_1 = bytes_1.next(); !bytes_1_1.done; bytes_1_1 = bytes_1.next()) {
            var charCode = bytes_1_1.value;
            str += String.fromCharCode(charCode);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (bytes_1_1 && !bytes_1_1.done && (_a = bytes_1.return)) _a.call(bytes_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var base64String = btoa(str);
    return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function base64URLStringToBuffer(base64URLString) {
    var base64 = base64URLString.replace(/-/g, '+').replace(/_/g, '/');
    var padLength = (4 - (base64.length % 4)) % 4;
    var padded = base64.padEnd(base64.length + padLength, '=');
    var binary = atob(padded);
    var buffer = new ArrayBuffer(binary.length);
    var bytes = new Uint8Array(buffer);
    for (var i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return buffer;
}

function supportsWebauthn() {
    return ((window === null || window === void 0 ? void 0 : window.PublicKeyCredential) !== undefined && typeof window.PublicKeyCredential === 'function');
}

function toPublicKeyCredentialDescriptor(descriptor) {
    var id = descriptor.id;
    return tslib.__assign(tslib.__assign({}, descriptor), { id: base64URLStringToBuffer(id) });
}

function startAttestation(creationOptionsJSON) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var publicKey, credential, id, rawId, response, type, credentialJSON;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!supportsWebauthn()) {
                        throw new Error('WebAuthn is not supported in this browser');
                    }
                    publicKey = tslib.__assign(tslib.__assign({}, creationOptionsJSON), { challenge: base64URLStringToBuffer(creationOptionsJSON.challenge), user: tslib.__assign(tslib.__assign({}, creationOptionsJSON.user), { id: utf8StringToBuffer(creationOptionsJSON.user.id) }), excludeCredentials: creationOptionsJSON.excludeCredentials.map(toPublicKeyCredentialDescriptor) });
                    return [4, navigator.credentials.create({ publicKey: publicKey })];
                case 1:
                    credential = (_a.sent());
                    if (!credential) {
                        throw new Error('Attestation was not completed');
                    }
                    id = credential.id, rawId = credential.rawId, response = credential.response, type = credential.type;
                    credentialJSON = {
                        id: id,
                        rawId: bufferToBase64URLString(rawId),
                        response: {
                            attestationObject: bufferToBase64URLString(response.attestationObject),
                            clientDataJSON: bufferToBase64URLString(response.clientDataJSON),
                        },
                        type: type,
                        clientExtensionResults: credential.getClientExtensionResults(),
                    };
                    if (typeof response.getTransports === 'function') {
                        credentialJSON.transports = response.getTransports();
                    }
                    return [2, credentialJSON];
            }
        });
    });
}

function bufferToUTF8String(value) {
    return new TextDecoder('utf-8').decode(value);
}

function startAssertion(requestOptionsJSON) {
    var _a, _b;
    return tslib.__awaiter(this, void 0, void 0, function () {
        var allowCredentials, publicKey, credential, id, rawId, response, type, userHandle;
        return tslib.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!supportsWebauthn()) {
                        throw new Error('WebAuthn is not supported in this browser');
                    }
                    if (((_a = requestOptionsJSON.allowCredentials) === null || _a === void 0 ? void 0 : _a.length) !== 0) {
                        allowCredentials = (_b = requestOptionsJSON.allowCredentials) === null || _b === void 0 ? void 0 : _b.map(toPublicKeyCredentialDescriptor);
                    }
                    publicKey = tslib.__assign(tslib.__assign({}, requestOptionsJSON), { challenge: base64URLStringToBuffer(requestOptionsJSON.challenge), allowCredentials: allowCredentials });
                    return [4, navigator.credentials.get({ publicKey: publicKey })];
                case 1:
                    credential = (_c.sent());
                    if (!credential) {
                        throw new Error('Assertion was not completed');
                    }
                    id = credential.id, rawId = credential.rawId, response = credential.response, type = credential.type;
                    userHandle = undefined;
                    if (response.userHandle) {
                        userHandle = bufferToUTF8String(response.userHandle);
                    }
                    return [2, {
                            id: id,
                            rawId: bufferToBase64URLString(rawId),
                            response: {
                                authenticatorData: bufferToBase64URLString(response.authenticatorData),
                                clientDataJSON: bufferToBase64URLString(response.clientDataJSON),
                                signature: bufferToBase64URLString(response.signature),
                                userHandle: userHandle,
                            },
                            type: type,
                            clientExtensionResults: credential.getClientExtensionResults(),
                        }];
            }
        });
    });
}

exports.startAssertion = startAssertion;
exports.startAttestation = startAttestation;
exports.supportsWebauthn = supportsWebauthn;
