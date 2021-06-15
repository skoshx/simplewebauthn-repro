import { PublicKeyCredentialCreationOptionsJSON, AttestationCredentialJSON } from '@simplewebauthn/typescript-types';
export default function startAttestation(creationOptionsJSON: PublicKeyCredentialCreationOptionsJSON): Promise<AttestationCredentialJSON>;
