import { PublicKeyCredentialRequestOptionsJSON, AssertionCredentialJSON } from '@simplewebauthn/typescript-types';
export default function startAssertion(requestOptionsJSON: PublicKeyCredentialRequestOptionsJSON): Promise<AssertionCredentialJSON>;
